import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import container from "markdown-it-container";
import footnote from "markdown-it-footnote";
import taskLists from "markdown-it-task-lists";

/**
 * Convert Markdown to HTML using markdown-it with Zenn-like configuration
 * Supports: GitHub Flavored Markdown, anchors, footnotes, task lists, alerts
 */
export function convertMarkdownToHtml(markdown: string): string {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true,
    typographer: true,
  });

  // Enable plugins
  md.use(anchor, {
    permalink: false,
    permalinkBefore: false,
    permalinkSymbol: "",
  });

  md.use(footnote);
  md.use(taskLists);

  // Add custom containers for alerts (Zenn-style)
  const alertTypes = ["note", "info", "warning", "alert", "details"];
  alertTypes.forEach((type) => {
    md.use(container, type, {
      render(tokens: any[], idx: number) {
        if (tokens[idx].nesting === 1) {
          const title = tokens[idx].info.trim().slice(type.length).trim() || type.toUpperCase();
          return `<div class="msg msg-${type}"><div class="msg-title">${title}</div>\n`;
        } else {
          return "</div>\n";
        }
      },
    });
  });

  return md.render(markdown);
}
