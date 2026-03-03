import { goto } from "$app/navigation";
import { page } from "$app/state";

export function navigationTo(url: string) {
  const curPath = page.url.pathname;
  if (url === curPath) return;
  goto(url);
}