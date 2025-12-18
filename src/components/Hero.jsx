import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const texts = [
    "Développeur Front-End",
    "Développeur Web",
    "Étudiant en MMI",
    "Créatif & Passionné"
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayText === current) {
        setTimeout(() => setIsDeleting(true), 1200);
      }

      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section id="hero" className="hero">
      <div>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Bonjour, je suis
        </motion.h1>

        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hamed Konaté
        </motion.h2>

        <p className="typewriter">
          {displayText}
          <span className="cursor">|</span>
        </p>
      </div>

      {/* PHOTO — PAS DE TEXTE */}
      <motion.div
        className="hero-img-placeholder"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <img
          src="./images/hk.jpg"   // 🔴 le fichier DOIT être dans /public
          alt="Hamed Konaté"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%"
          }}
        />
      </motion.div>
    </section>
  );
}
