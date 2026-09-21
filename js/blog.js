import { siteConfig } from "./main.js";

/**
 * Blog page — bridges to WordPress when configured in siteConfig.blog
 */
function initBlogPage() {
  const placeholder = document.getElementById("blog-placeholder");
  const bridge = document.getElementById("blog-wordpress-bridge");
  const embedWrap = document.getElementById("blog-wordpress-embed");
  const { blog } = siteConfig;

  if (!blog || !blog.wordpressUrl || blog.wordpressUrl.startsWith("[")) {
    return;
  }

  const url = blog.wordpressUrl.replace(/\/$/, "");

  if (blog.redirectOnVisit) {
    window.location.replace(url);
    return;
  }

  if (placeholder) placeholder.hidden = true;

  if (blog.embedWordPress && embedWrap) {
    embedWrap.hidden = false;
    const iframe = embedWrap.querySelector("iframe");
    if (iframe) iframe.src = url;
    return;
  }

  if (bridge) {
    bridge.hidden = false;
    const externalLink = bridge.querySelector("[data-blog-external]");
    if (externalLink) {
      externalLink.href = url;
      if (blog.openInNewTab) {
        externalLink.target = "_blank";
        externalLink.rel = "noopener noreferrer";
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", initBlogPage);
