import { motion } from "framer-motion";
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
  const [active, setActive]     = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  /* ── shadow on scroll ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── highlight active section ── */
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY + 130;
      links.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const next = links[i + 1] ? document.getElementById(links[i + 1].id) : null;
        if (top >= el.offsetTop && (!next || top < next.offsetTop)) {
          setActive(id);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.3)" : "none" }}
    >
      {/* Logo */}
      <span className="navbar-logo" onClick={() => goto("hero")}>
        H<span>K</span>.
      </span>

      {/* Links */}
      <ul>
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
    </motion.nav>
  );
}