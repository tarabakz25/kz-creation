import { writable } from "svelte/store";
import { goto } from "$app/navigation";
import { page } from "$app/state";
import { get } from "svelte/store";

export function navigationTo(url: string) {
  const curPath = get(page).url.pathname;
  if (url === curPath) return;
  goto(url);
}