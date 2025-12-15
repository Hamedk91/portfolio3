import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", name: "HTML" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", name: "CSS" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", name: "JavaScript" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", name: "Bootstrap" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", name: "Angular" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", name: "PHP" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", name: "Java" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", name: "SQL" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", name: "Spring Boot" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg", name: "Photoshop" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg", name: "Illustrator" },
  ];

  return (
    <section id="skills" className="section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Compétences
      </motion.h2>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-card"
            whileHover={{ y: -8, scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <img src={skill.icon} alt={skill.name} className="skill-icon-img" />
            <p>{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
