import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { listPhotos } from "$lib/server/s3";

export const GET: RequestHandler = async () => {
  const photos = await listPhotos();
  return json(photos);
};
