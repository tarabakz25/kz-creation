import adapter from "@sveltejs/adapter-auto";
import { mdsvex, escapeSvelte } from "mdsvex";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const Prism = require("prismjs");

// Load common languages
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-typescript");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-tsx");
require("prismjs/components/prism-css");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-json");
require("prismjs/components/prism-markdown");
require("prismjs/components/prism-python");
require("prismjs/components/prism-yaml");
require("prismjs/components/prism-diff");

/** @param {string} code @param {string | undefined} lang */
function highlighter(code, lang) {
  const prismLang = lang && Prism.languages[lang];
  let highlighted;

  if (prismLang) {
    highlighted = Prism.highlight(code, prismLang, lang);
  } else {
    // Fallback: HTML-encode only
    highlighted = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  const escapedCode = escapeSvelte(highlighted);
  const langClass = `language-${lang ?? "text"}`;
  return `<pre class="${langClass}"><code class="${langClass}">${escapedCode}</code></pre>`;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [
    mdsvex({
      extensions: [".md"],
      highlight: { highlighter },
    }),
  ],
  kit: {
    adapter: adapter(),
  },
};

export default config;
