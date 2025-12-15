import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Site Vitrine WordPress",
      image: "/images/projet_wordpress.png",
      videos: [
        { src: "/video/wordpress_1.mp4", name: "Page d'accueil" },
        { src: "/video/wordpress_2.mp4", name: "Formulaire de contact" },
        { src: "/video/wordpress_3.mp4", name: "SEO et optimisation" },
        { src: "/video/wordpress_4.mp4", name: "" },
      ],
      description:
        "Développement d'un site vitrine pour l'entreprise Konaté Adhésif. Gestion complète du projet : création de la maquette sur Figma, intégration WordPress, mise en place d'un formulaire de contact fonctionnel et optimisation SEO.",
    },
    {
      id: 2,
      title: "Site Aviation – 2FL",
      image: "/images/projet_aviation.png",
      videos: [{ src: "/video/site_avion.mp4", name: "Page d'accueil" }],
      description:
        "Refonte complète d'un site web d'aviation existant. Modernisation de l'interface avec HTML5, CSS3 et Bootstrap. Amélioration de l'expérience utilisateur avec une navigation fluide et un design moderne.",
    },
    {
      id: 3,
      title: "Plateforme Easy2Drive",
      image: "/images/projet_easy2drive.png",
      videos: [
        { src: "/video/aesy2drive.mp4", name: "Tableau de bord élève" },
        { src: "/video/aesy2drive_auto-ecole.mp4", name: "Gestion auto-écoles" },
        { src: "/video/aesy2drive_test.mp4", name: "Test" },
      ],
      description:
        "Développement d'une plateforme web complète reliant auto-écoles et élèves. Technologies : Angular (front), PHP (back). Fonctionnalités : système de gestion des notes, tableau de bord pour les élèves, interface d'administration pour les auto-écoles.",
    },
    {
      id: 4,
      title: "Site Pesticides – Data Visualisation",
      image: "/images/projet_pesticide.png",
      videos: [{ src: "/video/site_pesticide.mp4", name: "Visualisation des données" }],
      description:
        "Création d'un site web permettant d'exploiter et visualiser des données sur les pesticides. Utilisation de Chart.js et D3.js pour créer des graphiques interactifs. Interface intuitive pour analyse rapide des données.",
    },
  ];

  return (
    <section id="projects" className="section">
      <h2>Projets Web</h2>
      <p className="section-subtitle">Découvrez mes réalisations</p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -10 }}
            onClick={() => {
              setSelectedProject(project);
              setCurrentVideoIndex(0);
            }}
          >
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <span className="project-view">Voir le projet →</span>
              </div>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                ✕
              </button>

              <div className="modal-body">
                <div className="modal-video">
                  <motion.div
                    key={currentVideoIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <video controls className="video-player">
                      <source
                        src={selectedProject.videos[currentVideoIndex].src}
                        type="video/mp4"
                      />
                      Votre navigateur ne supporte pas les vidéos.
                    </video>
                  </motion.div>
                  <p className="video-name">
                    {selectedProject.videos[currentVideoIndex].name}
                  </p>

                  {selectedProject.videos.length > 1 && (
                    <div className="video-navigation">
                      <button
                        onClick={() =>
                          setCurrentVideoIndex(
                            (currentVideoIndex - 1 + selectedProject.videos.length) %
                              selectedProject.videos.length
                          )
                        }
                      >
                        ← Précédente
                      </button>
                      <button
                        onClick={() =>
                          setCurrentVideoIndex((currentVideoIndex + 1) % selectedProject.videos.length)
                        }
                      >
                        Suivante →
                      </button>
                    </div>
                  )}

                  {/* MINIATURES */}
                  {selectedProject.videos.length > 1 && (
                    <div className="video-thumbnails">
                      {selectedProject.videos.map((video, index) => (
                        <img
                          key={index}
                          src="/images/video_placeholder.png" // mettre de vraies miniatures si dispo
                          alt={video.name}
                          className={currentVideoIndex === index ? "active-thumb" : ""}
                          onClick={() => setCurrentVideoIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="modal-description">
                  <h2>{selectedProject.title}</h2>
                  <p>{selectedProject.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
