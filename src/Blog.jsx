import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

// Vite's import.meta.glob — loads all .md files from the posts folder
// The { as: "raw", eager: true } tells Vite to import them as plain strings
const postFiles = import.meta.glob("./posts/*.md", { as: "raw", eager: true });

// Parse frontmatter (the --- block at the top of each .md file)
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) meta[key.trim()] = rest.join(":").trim();
  });

  return { meta, content: match[2].trim() };
}

// Build a sorted list of posts from the glob imports
function loadPosts() {
  return Object.entries(postFiles)
    .map(([filepath, raw]) => {
      const slug = filepath.replace("./posts/", "").replace(".md", "");
      const { meta, content } = parseFrontmatter(raw);
      return { slug, content, ...meta };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ─── BLOG LIST PAGE ───────────────────────────────────────────────────────────
export function BlogList({ onSelectPost }) {
  const posts = loadPosts();
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <>
      <style>{`
        .blog-list-header {
          padding-top: 4rem;
          margin-bottom: 3rem;
        }
        .post-row {
          display: block;
          padding: 2rem 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: background 0.15s;
        }
        .post-row:first-of-type { border-top: 1px solid var(--border); }
        .post-row:hover .post-row-title { color: var(--accent); }
        .post-row-meta {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.5rem;
        }
        .post-row-title {
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: 2.2rem;
          letter-spacing: 0.04em;
          line-height: 1;
          color: var(--ink);
          transition: color 0.2s;
          margin-bottom: 0.6rem;
        }
        .post-row-summary {
          font-size: 13px;
          color: var(--muted);
          max-width: 520px;
        }
        .post-row-arrow {
          float: right;
          font-size: 1.2rem;
          color: var(--muted);
          margin-top: 0.2rem;
          transition: transform 0.2s, color 0.2s;
        }
        .post-row:hover .post-row-arrow {
          transform: translate(4px, -4px);
          color: var(--accent);
        }
        .blog-empty {
          color: var(--muted);
          font-size: 13px;
          padding: 3rem 0;
        }

        /* stagger fade-in for post rows */
        .post-row-wrap {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .post-row-wrap.visible {
          opacity: 1;
          transform: none;
        }
      `}</style>

      <div className="blog-list-header">
        <p className="section-label">Writing</p>
        <h2 className="section-title">All Posts.</h2>
        <div className="divider" />
      </div>

      {posts.length === 0 ? (
        <p className="blog-empty">No posts yet. Drop a .md file in src/posts/ to get started.</p>
      ) : (
        posts.map((post, i) => (
          <div
            key={post.slug}
            className={`post-row-wrap ${visible ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            <div className="post-row" onClick={() => onSelectPost(post.slug)}>
              <span className="post-row-arrow">↗</span>
              <p className="post-row-meta">{post.date}</p>
              <h3 className="post-row-title">{post.title}</h3>
              <p className="post-row-summary">{post.summary}</p>
            </div>
          </div>
        ))
      )}
    </>
  );
}

// ─── SINGLE POST PAGE ─────────────────────────────────────────────────────────
export function BlogPost({ slug, onBack }) {
  const posts = loadPosts();
  const post = posts.find((p) => p.slug === slug);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  if (!post) {
    return (
      <div style={{ paddingTop: "4rem" }}>
        <p style={{ color: "var(--muted)" }}>Post not found.</p>
        <button onClick={onBack} className="back-btn" style={{ marginTop: "1rem" }}>← Back</button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .back-btn {
          background: none;
          border: none;
          color: var(--muted);
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 0;
          margin-bottom: 3rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.2s;
        }
        .back-btn:hover { color: var(--accent); }

        .post-header { margin-bottom: 3rem; }
        .post-date {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.75rem;
        }
        .post-title {
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: clamp(2.5rem, 8vw, 5rem);
          line-height: 1;
          letter-spacing: 0.04em;
          margin-bottom: 1rem;
        }
        .post-summary-lede {
          color: var(--muted);
          font-size: 1rem;
          max-width: 520px;
          line-height: 1.8;
          border-left: 2px solid var(--accent);
          padding-left: 1rem;
        }

        /* Markdown content styles */
        .post-body {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.9;
          max-width: 600px;
          margin-top: 3rem;
          border-top: 1px solid var(--border);
          padding-top: 2.5rem;
        }
        .post-body h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: 2rem;
          letter-spacing: 0.05em;
          color: var(--ink);
          margin: 2.5rem 0 1rem;
        }
        .post-body h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: 1.4rem;
          letter-spacing: 0.05em;
          color: var(--ink);
          margin: 2rem 0 0.75rem;
        }
        .post-body p { margin-bottom: 1.4rem; }
        .post-body strong { color: var(--ink); }
        .post-body em { color: var(--ink); font-style: italic; }
        .post-body a { color: var(--accent); text-decoration: none; border-bottom: 1px solid var(--accent); }
        .post-body a:hover { color: var(--ink); border-color: var(--ink); }
        .post-body ul, .post-body ol {
          padding-left: 1.5rem;
          margin-bottom: 1.4rem;
        }
        .post-body li { margin-bottom: 0.4rem; }
        .post-body code {
          font-family: 'Share Tech Mono', monospace;
          background: var(--card);
          color: var(--accent);
          padding: 0.1em 0.4em;
          font-size: 13px;
          border: 1px solid var(--border);
        }
        .post-body pre {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 1.5rem;
          overflow-x: auto;
          margin-bottom: 1.4rem;
        }
        .post-body pre code {
          background: none;
          border: none;
          padding: 0;
          color: var(--accent);
        }
        .post-body blockquote {
          border-left: 2px solid var(--accent);
          padding-left: 1rem;
          color: var(--muted);
          margin: 1.5rem 0;
        }
        .post-body hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 2rem 0;
        }

        .post-fade {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .post-fade.visible { opacity: 1; transform: none; }
      `}</style>

      <div className={`post-fade ${visible ? "visible" : ""}`} style={{ paddingTop: "4rem" }}>
        <button className="back-btn" onClick={onBack}>← All Posts</button>

        <div className="post-header">
          <p className="post-date">{post.date}</p>
          <h1 className="post-title">{post.title}</h1>
          {post.summary && <p className="post-summary-lede">{post.summary}</p>}
        </div>

        <div className="post-body">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}