import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";

const affiches = [
  {
    src:   "/images/Timberland1 .png",
    title: "Timberland — Campaign I",
    desc:  "Affiche publicitaire campagne automne",
    tool:  "Photoshop",
    tag:   "Print",
  },
  {
    src:   "/images/Timberland2.png",
    title: "Timberland — Campaign II",
    desc:  "Déclinaison lifestyle hiver",
    tool:  "Photoshop",
    tag:   "Print",
  },
  {
    src:   "/images/Timberland3.png",
    title: "Timberland — Campaign III",
    desc:  "Composition vectorielle éditoriale",
    tool:  "Illustrator",
    tag:   "Vector",
  },
];

/* ── Carte avec effet 3D tilt + spotlight ─────────────── */
function DesignCard({ item, index, onClick }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [8, -8]);
  const rotateY = useTransform(x, [-60, 60], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width  / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  /* layout alterné : grande / petite */
  const isFeatured = index === 0;

  return (
    <motion.div
      ref={cardRef}
      className={`dcard ${isFeatured ? "dcard--big" : "dcard--small"}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(index)}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ z: 20 }}
    >
      {/* image */}
      <div className="dcard-img-wrap">
        <motion.img
          src={item.src}
          alt={item.title}
          className="dcard-img"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Overlay gradient */}
        <div className="dcard-gradient" />

        {/* Hover overlay */}
        <motion.div
          className="dcard-hover-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="dcard-zoom-icon"
            initial={{ scale: 0.7, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            ↗
          </motion.span>
        </motion.div>
      </div>

      {/* méta flottante */}
      <div className="dcard-meta">
        <div className="dcard-meta-left">
          <span className="dcard-tag">{item.tag}</span>
          <p className="dcard-title">{item.title}</p>
          <p className="dcard-desc">{item.desc}</p>
        </div>
        <span className="dcard-num">{String(index + 1).padStart(2, "0")}</span>
      </div>

      {/* badge outil (style 3D raised) */}
      <div className="dcard-tool" style={{ transform: "translateZ(20px)" }}>
        {item.tool}
      </div>
    </motion.div>
  );
}

/* ── Lightbox cinématique ─────────────────────────────── */
function Lightbox({ index, onClose, onPrev, onNext }) {
  if (index === null) return null;
  const item = affiches[index];

  return (
    <motion.div
      className="lb-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      {/* Image frame */}
      <motion.div
        className="lb-frame"
        key={index}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{ opacity: 0,    scale: 0.85, y: 40 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={item.src} alt={item.title} className="lb-img" />

        {/* Barre info bas */}
        <motion.div
          className="lb-bar"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <p className="lb-bar-title">{item.title}</p>
            <p className="lb-bar-desc">{item.desc} · <span style={{ color: "var(--gold)" }}>{item.tool}</span></p>
          </div>
          <span className="lb-counter">{index + 1} <span style={{ opacity: .4 }}>/</span> {affiches.length}</span>
        </motion.div>
      </motion.div>

      {/* Bouton fermer */}
      <button className="lb-close" onClick={onClose}>✕</button>

      {/* Flèches */}
      <button className="lb-arrow lb-arrow--left"  onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>
      <button className="lb-arrow lb-arrow--right" onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>

      {/* Miniatures */}
      <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
        {affiches.map((a, i) => (
          <motion.div
            key={i}
            className={`lb-thumb ${i === index ? "lb-thumb--active" : ""}`}
            onClick={() => onPrev(i)}
            whileHover={{ scale: 1.05 }}
          >
            <img src={a.src} alt="" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Design() {
  const [lightbox, setLightbox] = useState(null);

  const prev = (i) => {
    if (typeof i === "number") { setLightbox(i); return; }
    setLightbox((l) => (l - 1 + affiches.length) % affiches.length);
  };
  const next = () => setLightbox((l) => (l + 1) % affiches.length);

  return (
    <div className="design-section" id="design">
      <div className="design-inner">

        {/* Header */}
        <div className="design-header-row">
          <div>
            <motion.p
              className="sec-label"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Créations visuelles
            </motion.p>
            <motion.h2
              className="sec-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Design graphique
            </motion.h2>
          </div>
          <motion.p
            className="design-hint"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Survolez · Cliquez pour agrandir
          </motion.p>
        </div>

        {/* Galerie asymétrique */}
        <div className="design-gallery">
          {affiches.map((item, i) => (
            <DesignCard key={i} item={item} index={i} onClick={setLightbox} />
          ))}
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            index={lightbox}
            onClose={() => setLightbox(null)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </div>
  );
}