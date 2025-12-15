import { motion } from "framer-motion";

export default function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="navbar"
    >
      <ul>
        <li onClick={() => scrollTo('hero')}>Accueil</li>
        <li onClick={() => scrollTo('about')}>À propos</li>
        <li onClick={() => scrollTo('skills')}>Compétences</li>
        <li onClick={() => scrollTo('projects')}>Projets</li>
        <li onClick={() => scrollTo('design')}>Design</li>
        <li onClick={() => scrollTo('contact')}>Contact</li>
      </ul>
    </motion.nav>
  );
}