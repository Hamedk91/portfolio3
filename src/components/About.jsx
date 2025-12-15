import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2>À propos</h2>
      <p>
        Jeune professionnel souriant et énergique, passionné par le développement web, 
        je m'adapte rapidement aux besoins variés des clients. Actuellement à la recherche 
        d'un <strong>stage de 16 semaines à partir du 1er mai</strong>, ou d'une <strong>alternance 
        pour l'année scolaire prochaine</strong>, afin de perfectionner mes compétences techniques 
        (front-end, back-end) et contribuer à des projets concrets.
      </p>

      <a href="/cv.pdf" className="btn" target="_blank" rel="noreferrer">
        Télécharger mon CV
      </a>
    </motion.section>
  );
}