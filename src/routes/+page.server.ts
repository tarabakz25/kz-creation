import type { PageServerLoad } from "./$types";
import { listPhotos } from "$lib/server/s3";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  let photos;

  try {
    photos = await listPhotos();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load photos from S3";
    console.error("[gallery] listPhotos failed:", e);
    throw error(500, { message });
  }

  return { photos };
};
