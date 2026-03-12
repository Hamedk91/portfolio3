import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const links = [
  { id: "hero",     label: "Accueil"     },
  { id: "about",    label: "À propos"    },
  { id: "skills",   label: "Compétences" },
  { id: "projects", label: "Projets"     },
  { id: "design",   label: "Design"      },
  { id: "contact",  label: "Contact"     },
];

export default function Navbar() {
  const [active,   setActive]   = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  /* shadow on scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* active section */
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY + 130;
      links.forEach(({ id }, i) => {
        const el   = document.getElementById(id);
        if (!el) return;
        const next = links[i + 1] ? document.getElementById(links[i + 1].id) : null;
        if (top >= el.offsetTop && (!next || top < next.offsetTop)) setActive(id);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* fermer menu si scroll */
  useEffect(() => {
    if (!open) return;
    const fn = () => setOpen(false);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [open]);

  const goto = (id) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.35)" : "none" }}
      >
        {/* Logo */}
        <span className="navbar-logo" onClick={() => goto("hero")}>
          H<span>K</span>.
        </span>

        {/* Liens desktop */}
        <ul className="navbar-desktop">
          {links.map((l) => (
            <li
              key={l.id}
              className={active === l.id ? "active" : ""}
              onClick={() => goto(l.id)}
            >
              {l.label}
            </li>
          ))}
        </ul>

        {/* Bouton hamburger mobile */}
        <button
          className={`hamburger${open ? " hamburger--open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </motion.nav>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            {/* Panneau */}
            <motion.div
              className="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              {/* Logo dans le panneau */}
              <div className="mobile-menu-logo">
                H<span>K</span>.
              </div>

              {/* Liens */}
              <nav className="mobile-menu-links">
                {links.map((l, i) => (
                  <motion.button
                    key={l.id}
                    className={`mobile-link${active === l.id ? " mobile-link--active" : ""}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1, duration: 0.4 }}
                    onClick={() => goto(l.id)}
                  >
                    <span className="mobile-link-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mobile-link-label">{l.label}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Bas du menu */}
              <motion.div
                className="mobile-menu-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href="mailto:hamed2004150@gmail.com" className="mobile-menu-email">
                  hamed2004150@gmail.com
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}