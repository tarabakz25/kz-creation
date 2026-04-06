import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "$env/dynamic/private";
import type { Photo } from "$lib/types/photo";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

/** Presigned URL の有効期限（秒）。1時間。 */
const PRESIGNED_URL_EXPIRES_IN = 3600;

// ---------------------------------------------------------------------------
// S3 client — lazy initialization
// ---------------------------------------------------------------------------

let _client: S3Client | null = null;

function getClient(): S3Client {
  if (_client) return _client;

  // ローカル変数に取り出すことで、ガード後に TypeScript が string へ narrowing できる
  const accessKeyId = env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = env.AWS_SECRET_ACCESS_KEY;
  const region = env.AWS_REGION;

  if (!accessKeyId || !secretAccessKey || !region || !env.S3_BUCKET_NAME) {
    const missing = [
      ["AWS_ACCESS_KEY_ID", accessKeyId],
      ["AWS_SECRET_ACCESS_KEY", secretAccessKey],
      ["AWS_REGION", region],
      ["S3_BUCKET_NAME", env.S3_BUCKET_NAME],
    ]
      .filter(([, v]) => !v)
      .map(([k]) => k);
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  _client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    // S3_ENDPOINT が指定された場合のみセット（MinIO / Cloudflare R2 など対応）
    ...(env.S3_ENDPOINT ? { endpoint: env.S3_ENDPOINT } : {}),
  });

  return _client;
}

function getBucket(): string {
  if (!env.S3_BUCKET_NAME) {
    throw new Error("Missing required environment variable: S3_BUCKET_NAME");
  }
  return env.S3_BUCKET_NAME;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isImageKey(key: string): boolean {
  const dotIndex = key.lastIndexOf(".");
  if (dotIndex === -1) return false;
  return IMAGE_EXTENSIONS.has(key.slice(dotIndex).toLowerCase());
}

/**
 * S3 のオブジェクトキーから Photo のメタデータを解析する。
 *
 * サポートするキー形式（例）:
 *   - `2024-06-01_tokyo-tower.jpg`
 *   - `tokyo/2024-06-01_tokyo-tower.jpg`
 *   - `tokyo/tokyo-tower.jpg`
 *   - `tokyo-tower.jpg`
 */
function parsePhotoMetadata(key: string, lastModified: Date): Omit<Photo, "imageUrl"> {
  const segments = key.split("/");
  const filename = segments[segments.length - 1];
  const dotIndex = filename.lastIndexOf(".");
  const basename = dotIndex !== -1 ? filename.slice(0, dotIndex) : filename;

  // YYYY-MM-DD_ または YYYY-MM-DD- で始まるプレフィックスを日付として扱う
  const dateMatch = basename.match(/^(\d{4}-\d{2}-\d{2})[_-]([\s\S]+)/);
  const slug = dateMatch ? dateMatch[2] : basename;
  const date = dateMatch ? dateMatch[1] : lastModified.toISOString().slice(0, 10);

  // ルート直下でなければ親ディレクトリを location として扱う
  const location = segments.length >= 2 ? segments[segments.length - 2] : undefined;

  return {
    slug,
    title: slug.replace(/[-_]/g, " "),
    date,
    ...(location ? { location } : {}),
  };
}

/** ListObjectsV2 のページネーションを内部で処理し、全画像オブジェクトを返す。 */
async function listAllImageObjects(): Promise<{ Key: string; LastModified: Date }[]> {
  const client = getClient();
  const bucket = getBucket();
  const result: { Key: string; LastModified: Date }[] = [];
  let continuationToken: string | undefined;

  do {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      ...(continuationToken ? { ContinuationToken: continuationToken } : {}),
    });

    const response = await client.send(command);

    for (const obj of response.Contents ?? []) {
      if (obj.Key && obj.LastModified && isImageKey(obj.Key)) {
        result.push({ Key: obj.Key, LastModified: obj.LastModified });
      }
    }

    continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
  } while (continuationToken);

  return result;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * S3 バケット内の全画像を取得し、日付降順でソートして返す。
 *
 * - 画像ファイルは拡張子（jpg / jpeg / png / webp / gif / avif）で判定する
 * - 各画像の URL はサーバーサイドで生成した Presigned URL（有効期限 1 時間）
 * - メタデータはオブジェクトキーのパス構造から解析する
 */
export async function listPhotos(): Promise<Photo[]> {
  const client = getClient();
  const bucket = getBucket();

  const imageObjects = await listAllImageObjects();

  // getSignedUrl はローカル処理（HTTP リクエストは発生しない）なので
  // Promise.all で並列実行しても安全
  const photos = await Promise.all(
    imageObjects.map(async ({ Key, LastModified }): Promise<Photo> => {
      const imageUrl = await getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key }), {
        expiresIn: PRESIGNED_URL_EXPIRES_IN,
      });

      return {
        ...parsePhotoMetadata(Key, LastModified),
        imageUrl,
      };
    }),
  );

  // 日付降順（新しい順）でソート
  return photos.sort((a, b) => b.date.localeCompare(a.date));
}
