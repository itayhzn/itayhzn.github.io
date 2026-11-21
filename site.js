// Shared rendering + small UI behaviors. Depends on publications-data.js (research, other, ME).
"use strict";

const esc = (value = "") =>
  String(value).replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[c]);

const byNewest = (a, b) => b.year - a.year || (b.order || 0) - (a.order || 0);
const visible = (list) => list.filter((p) => !p.hidden).sort(byNewest);

const LINK_LABELS = {
  project: "Project page",
  paper: "Paper",
  arxiv: "arXiv",
  pdf: "PDF",
  code: "Code",
  semanticScholar: "Semantic Scholar"
};

const primaryLink = (p) => p.links.project || p.links.paper || p.links.arxiv || p.links.pdf || "#";

function formatAuthors(authors, { maxShown = 8 } = {}) {
  const fmt = (name) => {
    const star = name.endsWith("*");
    const clean = star ? name.slice(0, -1) : name;
    const html = clean === ME ? `<strong class="me">${esc(clean)}</strong>` : esc(clean);
    return star ? `${html}<sup>*</sup>` : html;
  };
  if (authors.length <= maxShown) return authors.map(fmt).join(", ");
  // Long clinical author lists: first three, me, last — with ellipses in between.
  const meIdx = authors.findIndex((a) => a.replace(/\*$/, "") === ME);
  const keep = new Set([0, 1, 2, meIdx, authors.length - 1]);
  const parts = [];
  let prev = -1;
  [...keep].filter((i) => i >= 0).sort((a, b) => a - b).forEach((i) => {
    if (prev >= 0 && i > prev + 1) parts.push("…");
    parts.push(fmt(authors[i]));
    prev = i;
  });
  return parts.join(", ");
}

const hasEqualContribution = (p) => p.authors.some((a) => a.endsWith("*"));

function linkPills(p) {
  return Object.entries(p.links)
    .filter(([, url]) => url)
    .map(([key, url]) => `<a class="pill" href="${esc(url)}" target="_blank" rel="noopener">${esc(LINK_LABELS[key] || key)}</a>`)
    .join("");
}

function media(p) {
  const { image, video, fit } = p.media || {};
  const cls = `pub-media${fit === "contain" ? " is-contain" : ""}`;
  const inner = video
    ? `<video src="${esc(video)}" poster="${esc(image)}" muted loop playsinline preload="metadata" data-autoplay aria-hidden="true"></video>`
    : image
      ? `<img src="${esc(image)}" alt="" loading="lazy" decoding="async">`
      : `<span class="media-placeholder" aria-hidden="true"></span>`;
  return `<a class="${cls}" href="${esc(primaryLink(p))}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">${inner}</a>`;
}

function researchCard(p) {
  return `
    <article class="pub-card">
      ${media(p)}
      <div class="pub-body">
        <p class="venue">${esc(p.venue)}</p>
        <h3><a href="${esc(primaryLink(p))}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
        <p class="authors">${formatAuthors(p.authors)}</p>
        <div class="pills">${linkPills(p)}</div>
      </div>
    </article>`;
}

function researchRow(p) {
  return `
    <article class="pub-row">
      ${media(p)}
      <div class="pub-body">
        <p class="venue">${esc(p.venue)}</p>
        <h3><a href="${esc(primaryLink(p))}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
        <p class="authors">${formatAuthors(p.authors)}${hasEqualContribution(p) ? `<span class="eq-note">* equal contribution</span>` : ""}</p>
        <div class="pills">${linkPills(p)}</div>
      </div>
    </article>`;
}

function otherCard(p) {
  return `
    <article class="other-card">
      <p class="other-meta"><span class="field">${esc(p.field)}</span><span>${esc(p.venue.includes(String(p.year)) ? p.venue : `${p.venue}, ${p.year}`)}</span></p>
      <h3><a href="${esc(primaryLink(p))}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
      <p class="authors">${formatAuthors(p.authors)}</p>
      <div class="pills">${linkPills(p)}</div>
    </article>`;
}

function fill(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

// ---- Theme toggle (light / dark), remembered per browser. ----
function initTheme() {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  if (!button) return;
  const current = () =>
    root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const sync = () => button.setAttribute("aria-label", current() === "dark" ? "Switch to light theme" : "Switch to dark theme");
  sync();
  button.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (_) { /* storage unavailable */ }
    sync();
  });
}

// ---- Teaser videos: play only when on screen and when motion is allowed. ----
function initVideos() {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const videos = document.querySelectorAll("video[data-autoplay]");
  if (reduce || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.play().catch(() => {});
      else target.pause();
    });
  }, { threshold: 0.25 });
  videos.forEach((v) => io.observe(v));
}

document.addEventListener("DOMContentLoaded", () => {
  fill("selected-work", visible(research).filter((p) => p.selected).map(researchCard).join(""));
  fill("research-list", visible(research).map(researchRow).join(""));
  fill("other-list", visible(other).map(otherCard).join(""));
  initTheme();
  initVideos();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
