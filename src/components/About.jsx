import { motion } from "framer-motion";

const stats = [
  { num: "4+",   label: "Projets réalisés"    },
  { num: "2+",   label: "Années en MMI"       },
  { num: "12+",  label: "Technologies"        },
  { num: "100%", label: "Motivé & disponible" },
];

export default function About() {
  return (
    <section id="about" className="about-section">

      {/* ── HEADER ──────────────────────────────────── */}
      <motion.p
        className="sec-label"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        À propos
      </motion.p>

      <motion.h2
        className="sec-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Passionné par le web,<br />animé par la créativité.
      </motion.h2>

      {/* ── GRID ──────────────────────────────────────── */}
      <div className="about-grid">

        {/* TEXT + STATS */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p>
            Jeune professionnel souriant et énergique, je suis passionné par le développement
            web et l'expérience utilisateur. Je m'adapte rapidement aux besoins variés des
            clients et j'aime construire des interfaces à la fois belles et fonctionnelles.
          </p>
          <p>
            Actuellement à la recherche d'un{" "}
            <strong>stage de 16 semaines à partir du 1er mai</strong> ou d'une{" "}
            <strong>alternance pour l'année scolaire prochaine</strong>, afin de
            perfectionner mes compétences techniques et contribuer à des projets concrets.
          </p>

          {/* Stats */}
          <div className="about-stats">
            {stats.map((s) => (
              <div className="stat-box" key={s.label}>
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>

          <a
            href="./images/CV hamed_konate.pdf"
            className="btn-gold"
            target="_blank"
            rel="noreferrer"
            style={{ marginTop: "32px", display: "inline-block" }}
          >
            Télécharger mon CV
          </a>
        </motion.div>

        {/* PHOTO */}
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="about-img-wrap">
            <div className="about-placeholder">
              <span>HK</span>
            </div>
          </div>
          <div className="about-tag">Disponible dès mai 2025</div>
        </motion.div>

      </div>
    </section>
  );
}