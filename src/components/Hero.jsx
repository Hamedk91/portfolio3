import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const texts = [
  "Développeur Front-End",
  "Développeur Web",
  "Étudiant en MMI",
  "Créatif & Passionné",
];

export default function Hero() {
  const [textIndex,   setTextIndex]   = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting,  setIsDeleting]  = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const speed   = isDeleting ? 42 : 85;

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayText === current) {
        setTimeout(() => setIsDeleting(true), 1400);
      }
      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((p) => (p + 1) % texts.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  /* staggered fade-up helper */
  const fade = (delay) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="hero" className="hero">

      {/* ── TEXT ─────────────────────────────────────── */}
      <div style={{ flex: 1 }}>
        <motion.p className="hero-eyebrow" {...fade(0.1)}>
          Portfolio — 2025
        </motion.p>

        <motion.h1 {...fade(0.25)}>
          Hamed<br />
          <em>Konaté</em>
        </motion.h1>

        <motion.p className="hero-typewriter" {...fade(0.4)}>
          {displayText}
          <span className="cursor">|</span>
        </motion.p>

        <motion.div className="hero-actions" {...fade(0.55)}>
          <a
            href="./images/CV hamed_konate.pdf"
            className="btn-gold"
            target="_blank"
            rel="noreferrer"
          >
            Télécharger CV
          </a>
          <button
            className="btn-ghost"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Voir mes projets
          </button>
        </motion.div>
      </div>

      {/* ── PHOTO ────────────────────────────────────── */}
      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-frame">
          <img
            src="./images/hk.jpg"
            alt="Hamed Konaté"
          />
          <div className="hero-badge">
            <strong>3+</strong>
            ans d'études<br />en MMI
          </div>
        </div>
      </motion.div>

    </section>
  );
}