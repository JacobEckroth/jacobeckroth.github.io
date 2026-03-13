import { useState, useEffect } from "react";
import { BlogList, BlogPost } from "./Blog";

const portfolio = {
  name: "Jacob Eckroth",
  tagline: "Educator and Learner",
  bio: "I teach the math that powers everything. Passionate about clear proofs, elegant algorithms, and turning confusion into understanding. Based in the classroom and the terminal, working on something interesting.",
  email: "jacobeckroth@gmail.com",
  socials: {
    github: "https://github.com/jacobeckroth",
    linkedin: "https://www.linkedin.com/in/jacob-e-918064196/",
  },
};

// Simple client-side router using a state machine
// page: "home" | "blog" | "post"
// postSlug: string | null
function useRouter() {
  const [page, setPage] = useState("home");
  const [postSlug, setPostSlug] = useState(null);

  const goHome = () => { setPage("home"); setPostSlug(null); };
  const goBlog = () => { setPage("blog"); setPostSlug(null); };
  const goPost = (slug) => { setPage("post"); setPostSlug(slug); };

  return { page, postSlug, goHome, goBlog, goPost };
}

export default function App() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);  // ← add this
  const { page, postSlug, goHome, goBlog, goPost } = useRouter();

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, postSlug]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0d0d0f;
          --ink: #f0eee8;
          --muted: #6b6a72;
          --accent: #b8f564;
          --card: #141417;
          --border: #242428;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--ink);
          font-family: 'Share Tech Mono', monospace;
          font-size: 14px;
          line-height: 1.7;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes namePop {
          0%   { opacity: 0; transform: scale(0.6) translateY(30px); }
          60%  { opacity: 1; transform: scale(1.08) translateY(-6px); }
          80%  { transform: scale(0.97) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .hero-name-pop {
          animation: namePop 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }

        /* FIXED HEADER */
        header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 2rem;
          padding: 1.1rem 2.5rem;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }

       /* HAMBURGER - hidden on desktop */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          margin-left: auto;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--ink);
          border-radius: 2px;
          transition: transform 0.25s, opacity 0.25s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* MOBILE DROPDOWN - hidden on desktop */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 52px; left: 0; right: 0;
          z-index: 99;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          flex-direction: column;
          gap: 1rem;
          padding: 0 2.5rem;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, padding 0.25s ease;
        }

        .mobile-menu button.header-link {
          width: 100%;
          text-align: left;
          padding: 0;
          margin: 0;
        }

       @media (max-width: 768px) {
        header { gap: 0; }
        .header-link { display: none; }
        .hamburger { display: flex; }
        .mobile-menu { display: flex; }
        .mobile-menu .header-link { display: block; text-align: left; }  /* ← add text-align: left */
        .mobile-menu.open {
          max-height: 400px;
          padding: 1rem 2.5rem;
        }
      }
        .header-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Share Tech Mono', monospace;
        }
        .header-link:hover { color: var(--accent); }
        .header-link.active { color: var(--accent); }

        /* SECTIONS */
        section {
          max-width: 760px;
          margin: 0 auto;
          padding: 5rem 2rem;
        }

        /* HERO */
        #hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 80px;
        }
        .hero-name {
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: clamp(4rem, 13vw, 10rem);
          line-height: 0.95;
          letter-spacing: 0.04em;
          margin-bottom: 1.5rem;
        }
        .hero-tagline {
          font-size: 1rem;
          color: var(--muted);
          max-width: 420px;
          margin-bottom: 3rem;
        }

        /* DIVIDER */
        .divider {
          width: 40px;
          height: 2px;
          background: var(--accent);
          margin-bottom: 2.5rem;
        }

        /* SECTION LABEL */
        .section-label {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: 3.5rem;
          line-height: 1;
          letter-spacing: 0.05em;
          margin-bottom: 2rem;
        }

        /* ABOUT */
        #about { border-top: 1px solid var(--border); }
        .about-text {
          font-size: 1rem;
          color: var(--muted);
          max-width: 560px;
          line-height: 1.9;
        }

        /* CONTACT */
        #contact { border-top: 1px solid var(--border); }
        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        .contact-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          color: var(--muted);
          font-size: 13px;
          transition: color 0.2s;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border);
        }
        .contact-link:hover { color: var(--ink); }
        .contact-link:hover .link-label { color: var(--accent); }
        .link-label {
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: 1.6rem;
          letter-spacing: 0.05em;
          color: var(--ink);
          transition: color 0.2s;
          min-width: 120px;
        }

        footer {
          text-align: center;
          padding: 2rem;
          color: var(--muted);
          font-size: 12px;
          border-top: 1px solid var(--border);
        }
      `}</style>

      <header>
        <button className={`header-link ${page === "home" ? "active" : ""}`} onClick={goHome}>Home</button>
        <button className={`header-link ${page === "blog" || page === "post" ? "active" : ""}`} onClick={goBlog}>Writing</button>
        <a href={`mailto:${portfolio.email}`} className="header-link">{portfolio.email}</a>
        <a href={portfolio.socials.github} target="_blank" rel="noreferrer" className="header-link">GitHub</a>
        <a href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" className="header-link">LinkedIn</a>

        {/* Hamburger button (mobile only) */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className={`header-link ${page === "home" ? "active" : ""}`} onClick={() => { goHome(); setMenuOpen(false); }}>Home</button>
        <button className={`header-link ${page === "blog" || page === "post" ? "active" : ""}`} onClick={() => { goBlog(); setMenuOpen(false); }}>Writing</button>
        <a href={`mailto:${portfolio.email}`} className="header-link" onClick={() => setMenuOpen(false)}>{portfolio.email}</a>
        <a href={portfolio.socials.github} target="_blank" rel="noreferrer" className="header-link" onClick={() => setMenuOpen(false)}>GitHub</a>
        <a href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" className="header-link" onClick={() => setMenuOpen(false)}>LinkedIn</a>
      </div>

      {/* ── HOME PAGE ── */}
      {page === "home" && (
        <>
          <section id="hero">
            <h1 className="hero-name hero-name-pop">{portfolio.name}</h1>
            <div className={`fade-in ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
              <p className="hero-tagline">{portfolio.tagline}</p>
            </div>
          </section>

          <section id="about">
            <p className="section-label">About</p>
            <h2 className="section-title">A bit about me.</h2>
            <div className="divider" />
            <p className="about-text">{portfolio.bio}</p>
          </section>

          <section id="contact">
            <p className="section-label">Contact</p>
            <h2 className="section-title">Get in touch.</h2>
            <div className="contact-links">
              <a href={`mailto:${portfolio.email}`} className="contact-link">
                <span className="link-label">Email</span>
                <span>{portfolio.email}</span>
              </a>
              <a href={portfolio.socials.github} target="_blank" rel="noreferrer" className="contact-link">
                <span className="link-label">GitHub</span>
                <span>github.com/jacobeckroth</span>
              </a>
              <a href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" className="contact-link">
                <span className="link-label">LinkedIn</span>
                <span>linkedin.com/in/jacob-e-918064196</span>
              </a>
            </div>
          </section>

          <footer>
            <p>© {new Date().getFullYear()} {portfolio.name}</p>
          </footer>
        </>
      )}

      {/* ── BLOG LIST PAGE ── */}
      {page === "blog" && (
        <section style={{ paddingTop: "80px" }}>
          <BlogList onSelectPost={goPost} />
        </section>
      )}

      {/* ── SINGLE POST PAGE ── */}
      {page === "post" && (
        <section style={{ paddingTop: "80px" }}>
          <BlogPost slug={postSlug} onBack={goBlog} />
        </section>
      )}
    </>
  );
}