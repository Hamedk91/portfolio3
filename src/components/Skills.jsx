import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

/* ── DATA ──────────────────────────────────────────────── */
const categories = [
  {
    id:    "frontend",
    label: "Front-End",
    accent: "#F7DC4F",
    skills: [
      { name: "HTML5",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Bootstrap",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "Angular",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    ],
  },
  {
    id:    "backend",
    label: "Back-End",
    accent: "#C17F6A",
    skills: [
      { name: "PHP",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "Java",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name: "MySQL",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    id:    "design",
    label: "Design",
    accent: "#D9A898",
    skills: [
      { name: "Photoshop",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
      { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
    ],
  },
];

/* ── Pill individuelle ─────────────────────────────────── */
function SkillPill({ skill, accent, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="skill-pill"
      style={{
        "--accent": accent,
        borderColor: hovered ? accent : "var(--border)",
        background:  hovered ? `${accent}18` : "var(--bg-light)",
      }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.34, 1.56, 0.64, 1], /* spring-like overshoot */
      }}
      whileHover={{ y: -5, scale: 1.06 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Halo glow derrière l'icône */}
      {hovered && (
        <motion.div
          className="pill-glow"
          style={{ background: accent }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <motion.img
        src={skill.icon}
        alt={skill.name}
        className="pill-icon"
        loading="lazy"
        animate={{ rotate: hovered ? [0, -10, 10, 0] : 0 }}
        transition={{ duration: 0.4 }}
      />
      <span
        className="pill-name"
        style={{ color: hovered ? accent : "var(--white)" }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

/* ── Bloc catégorie ────────────────────────────────────── */
function CategorySection({ cat, catIndex }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="skills-cat-block"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: catIndex * 0.1 }}
    >
      {/* Titre catégorie */}
      <motion.div
        className="skills-cat-label"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: catIndex * 0.1 }}
      >
        {/* Barre colorée verticale */}
        <motion.div
          className="skills-cat-bar"
          style={{ background: cat.accent }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: catIndex * 0.1 + 0.1, ease: "easeOut" }}
        />
        <span style={{ color: cat.accent }}>{cat.label}</span>
      </motion.div>

      {/* Pills */}
      <div className="skills-pills-row">
        {cat.skills.map((s, i) => (
          <SkillPill key={s.name} skill={s} accent={cat.accent} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Composant principal ───────────────────────────────── */
export default function Skills() {
  return (
    <div className="skills-section" id="skills">
      <div className="skills-wrapper">

        {/* Header */}
        <motion.p
          className="sec-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Compétences
        </motion.p>

        <motion.h2
          className="sec-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Technologies maîtrisées
        </motion.h2>

        <motion.p
          className="sec-sub"
          style={{ marginBottom: "64px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Front-end, back-end et outils créatifs — une palette complète
          pour construire des projets de bout en bout.
        </motion.p>

        {/* Catégories */}
        <div className="skills-cats">
          {categories.map((cat, i) => (
            <CategorySection key={cat.id} cat={cat} catIndex={i} />
          ))}
        </div>

      </div>
    </div>
  );
}