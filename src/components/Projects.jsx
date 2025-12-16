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
        "La création du site WordPress a été un projet collaboratif mené à bien en duo. L’objectif était de définir un concept pertinent, puis de réaliser un site vitrine accordé à ce concept. La vidéo présente la page d'accueil. Nous avons créé une page regroupant toutes les collaborations réalisées entre différentes marques du secteur de la mode (les meilleurs collabs), une page dédiée aux meilleures collaborations et une page mettant en avant les collaborations improbables, comme par exemple celle entre Cars et Crocs. La page Contact permet aux utilisateurs de contacter les créateurs.",
    },
    {
      id: 2,
      title: "Site Aviation – 2FL",
      image: "/images/projet_aviation.png",
      videos: [{ src: "/video/site_avion.mp4", name: "Page d'accueil" }],
      description:
        "L’objectif de ce projet était de réaliser la refonte d’un site web consacré à l’aviation afin de le moderniser et de l’adapter aux standards actuels du web. Le site devait être plus attractif, dynamique et agréable à utiliser. Nous avons utilisé HTML et CSS pour structurer et styliser le contenu, ainsi que Bootstrap pour améliorer l’ergonomie, la mise en page et la compatibilité sur ordinateurs, tablettes et smartphones.",
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
        "Pour cette SAE, nous avons développé une plateforme visant à établir un lien entre les auto-écoles et les élèves. L’outil optimise l’interaction entre les deux parties. La gestion est assurée par un administrateur supervisant les activités. Les auto-écoles peuvent ajouter, modifier ou supprimer les notes des élèves, tandis que ces derniers peuvent visualiser leurs résultats directement sur la plateforme. Technologies : Angular, MySQL, TypeScript.",
    },
    {
      id: 4,
      title: "Site Pesticides – Data Visualisation",
      image: "/images/projet_pesticide.png",
      videos: [{ src: "/video/site_pesticide.mp4", name: "Visualisation des données" }],
      description:
        "L’objectif était de créer un site web permettant aux professionnels d’exploiter les données afin de prendre les meilleures décisions concernant le choix des pesticides selon le type de légume. Les informations sont présentées sous forme de graphiques réalisés avec Chart.js et D3.js. La principale difficulté a été la prise en main de D3.js, que nous n’avions jamais utilisé auparavant, nécessitant un temps d’apprentissage pour bien comprendre son fonctionnement. Technologies : JavaScript, HTML, CSS, D3.js, Chart.js.",
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

                  {selectedProject.videos.length > 1 && (
                    <div className="video-thumbnails">
                      {selectedProject.videos.map((video, index) => (
                        <img
                          key={index}
                          src="/images/video_placeholder.png"
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
