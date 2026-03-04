import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ── Icônes ────────────────────────────────────────────── */
const IconEmail     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="M22 6L12 13 2 6" stroke="currentColor" strokeWidth="1.8"/></svg>;
const IconLinkedIn  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;
const IconContext   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const IconRole      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/></svg>;
const IconResult    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconChallenge = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>;

/* ── DATA ──────────────────────────────────────────────── */
const projects = [
  {
    id:1, title:"Site Vitrine WordPress",
    image:"/images/projet_wordpress.png", period:"2023 – 2024",
    stack:["WordPress","HTML","CSS"],
    videos:[
      {src:"/video/wordpress_1.mp4",name:"Page d'accueil"},
      {src:"/video/wordpress_2.mp4",name:"Formulaire de contact"},
      {src:"/video/wordpress_3.mp4",name:"SEO et optimisation"},
      {src:"/video/wordpress_4.mp4",name:"Pages secondaires"},
    ],
    context:"Projet collaboratif en duo réalisé dans le cadre de la formation MMI. L'objectif était de concevoir un site vitrine WordPress autour d'un concept éditorial fort : recenser les meilleures collaborations entre marques de mode.",
    role:"J'ai principalement assuré le développement front-end : intégration des templates, personnalisation CSS avancée, mise en page responsive et optimisation UX. J'ai également configuré les plugins SEO et le formulaire de contact.",
    result:"Un site vitrine complet, responsive et bien référencé, livré dans les délais avec une navigation fluide et une identité visuelle cohérente.",
    challenge:"La principale difficulté a été de maîtriser l'écosystème WordPress (thèmes, plugins, hooks) en un temps limité, tout en conservant une personnalisation poussée sans casser le thème parent.",
  },
  {
    id:2, title:"Site Aviation – 2FL",
    image:"/images/projet_aviation.png", period:"2023",
    stack:["HTML","CSS","Bootstrap"],
    videos:[{src:"/video/site_avion.mp4",name:"Page d'accueil"}],
    context:"Refonte complète d'un site web consacré à l'aviation légère. Le site existant était vieillissant, peu responsive et visuellement dépassé. L'objectif était de lui donner un second souffle moderne et accessible.",
    role:"Développement front-end intégral : structure HTML sémantique, styles CSS personnalisés, intégration Bootstrap pour la grille responsive et la compatibilité multi-écrans.",
    result:"Un site modernisé, entièrement responsive, avec une navigation claire et un design épuré qui reflète l'univers de l'aviation légère.",
    challenge:"Adapter un contenu dense (fiches techniques, galeries photos, tableaux de données) à un affichage responsive cohérent sans perdre la lisibilité.",
  },
  {
    id:3, title:"Plateforme Easy2Drive",
    image:"/images/projet_easy2drive.png", period:"2024",
    stack:["Angular","TypeScript","MySQL"],
    videos:[
      {src:"/video/aesy2drive.mp4",name:"Tableau de bord élève"},
      {src:"/video/aesy2drive_auto-ecole.mp4",name:"Gestion auto-écoles"},
      {src:"/video/aesy2drive_test.mp4",name:"Tests de code"},
    ],
    context:"Plateforme web liant auto-écoles et élèves, développée en équipe dans le cadre d'un projet SAE. L'application gère trois types de profils avec des dashboards dédiés.",
    role:"J'ai travaillé à la fois sur le front-end (Angular, composants, routing, formulaires réactifs) et sur le back-end (APIs REST, gestion des rôles, requêtes MySQL).",
    result:"Une plateforme fonctionnelle permettant aux auto-écoles de saisir les notes et aux élèves de les consulter en temps réel, avec un espace admin complet.",
    challenge:"La complexité de la gestion des rôles et des droits d'accès côté back-end, ainsi que la synchronisation entre les appels API Angular et la base MySQL.",
  },
  {
    id:4, title:"Pesticides – Data Visualisation",
    image:"/images/projet_pesticide.png", period:"2024",
    stack:["JavaScript","D3.js","Chart.js"],
    videos:[{src:"/video/site_pesticide.mp4",name:"Visualisation des données"}],
    context:"Projet de data visualisation destiné aux professionnels agricoles pour les aider à choisir les pesticides adaptés selon le type de légume.",
    role:"Développement front-end complet : traitement des données JSON, création des graphiques interactifs avec D3.js et Chart.js.",
    result:"Un outil de consultation intuitif affichant des graphiques filtrables par légume, permettant une prise de décision rapide.",
    challenge:"La prise en main de D3.js, une librairie très bas niveau que nous n'avions jamais utilisée, avec un temps d'apprentissage conséquent.",
  },
  {
    id:5, title:"TXLFORMA – Gestion de formations",
    image:"/images/projet_txlforma.png", period:"Oct. 2025 – Jan. 2026",
    stack:["React.js","Spring Boot","MySQL","Blender"],
    videos:[{src:"/video/txlforma.mp4",name:"Présentation générale"}],
    context:"Projet universitaire réalisé en équipe à l'Université Gustave Eiffel en méthodologie agile. TXLFORMA est une plateforme web de gestion de formations numériques avec trois rôles : utilisateurs, formateurs et administrateurs.",
    role:"J'ai assuré le développement front-end avec React.js (composants, routing, état global) et participé au back-end avec Spring Boot (APIs REST, gestion des rôles, authentification JWT). Contribution à la modélisation 3D avec Blender.",
    result:"Une plateforme complète avec gestion des rôles, système de réservation et de paiement, suivi de parcours, gestion des sessions et tableau de bord administrateur.",
    challenge:"Coordonner le travail en équipe avec la méthodologie agile, gérer l'intégration React/Spring Boot avec CORS et JWT, et implémenter un système de paiement sécurisé dans les délais.",
  },
];

/* ── Bloc info dans la modal ───────────────────────────── */
function SectionBlock({ icon: Icon, label, text, color }) {
  return (
    <div className="modal-section-block" style={{ borderLeftColor: color }}>
      <div className="modal-section-header" style={{ color }}>
        <Icon /><span>{label}</span>
      </div>
      <p className="modal-section-text">{text}</p>
    </div>
  );
}

/* ── Modal ─────────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const [videoIdx, setVideoIdx] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }} onClick={onClose}>
      <motion.div className="modal-panel" initial={{ scale:0.9, opacity:0, y:50 }} animate={{ scale:1, opacity:1, y:0 }} exit={{ scale:0.9, opacity:0, y:50 }} transition={{ type:"spring", damping:26, stiffness:300 }} onClick={(e)=>e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        {/* Gauche */}
        <div className="modal-left">
          <div className="modal-video-wrap">
            <motion.video key={videoIdx} controls className="modal-video" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3 }}>
              <source src={project.videos[videoIdx].src} type="video/mp4"/>
            </motion.video>
          </div>
          {project.videos.length > 1 && (
            <div className="modal-tabs">
              {project.videos.map((v,i)=>(
                <button key={i} className={`modal-tab${videoIdx===i?" active":""}`} onClick={()=>setVideoIdx(i)}>{v.name||`Vidéo ${i+1}`}</button>
              ))}
            </div>
          )}
          <div className="modal-stack">
            {project.stack.map((t)=><span key={t} className="modal-stack-tag">{t}</span>)}
          </div>
          <div className="modal-contact-links">
            <a href="mailto:hamed2004150@gmail.com" className="modal-contact-btn" target="_blank" rel="noreferrer"><IconEmail/><span>hamed2004150@gmail.com</span></a>
            <a href="https://www.linkedin.com/in/hamed-konate-316307309/" className="modal-contact-btn modal-contact-btn--gold" target="_blank" rel="noreferrer"><IconLinkedIn/><span>LinkedIn</span></a>
          </div>
        </div>

        {/* Droite */}
        <div className="modal-right">
          <div className="modal-right-header">
            <p className="modal-project-num">Projet 0{project.id}</p>
            <h2 className="modal-project-title">{project.title}</h2>
            <p className="modal-project-period">{project.period}</p>
          </div>
          <div className="modal-info-blocks">
            <SectionBlock icon={IconContext}   label="Contexte"              text={project.context}   color="var(--gold)"/>
            <SectionBlock icon={IconRole}      label="Mon rôle"              text={project.role}      color="var(--salmon-light)"/>
            <SectionBlock icon={IconResult}    label="Résultat"              text={project.result}    color="#6EE7B7"/>
            <SectionBlock icon={IconChallenge} label="Difficulté rencontrée" text={project.challenge} color="#F87171"/>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Ligne de projet ───────────────────────────────────── */
function ProjectRow({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef(null);

  /* Parallax image */
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const iX = useTransform(mX, [-200,200], [-14,14]);
  const iY = useTransform(mY, [-80,80],   [-10,10]);

  const onMove = (e) => {
    if (!rowRef.current) return;
    const r = rowRef.current.getBoundingClientRect();
    mX.set(e.clientX - r.left  - r.width  / 2);
    mY.set(e.clientY - r.top   - r.height / 2);
  };

  return (
    <motion.div
      ref={rowRef}
      className="proj-row"
      initial={{ opacity:0, y:36 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.6, delay:index*0.09, ease:[0.22,1,0.36,1] }}
      onHoverStart={()=>setHovered(true)}
      onHoverEnd={()=>setHovered(false)}
      onMouseMove={onMove}
      onClick={()=>onClick(project)}
    >
      {/* Fond doré au hover */}
      <motion.div
        className="proj-row-bg"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration:0.3 }}
      />

      {/* Numéro */}
      <motion.span
        className="proj-row-num"
        animate={{ color: hovered ? "var(--gold)" : "rgba(250,247,244,0.18)" }}
        transition={{ duration:0.25 }}
      >
        {String(index+1).padStart(2,"0")}
      </motion.span>

      {/* Corps */}
      <div className="proj-row-body">
        <motion.h3
          className="proj-row-title"
          animate={{ x: hovered ? 10 : 0, color: hovered ? "var(--white)" : "rgba(250,247,244,0.82)" }}
          transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
        >
          {project.title}
        </motion.h3>
        <motion.div
          className="proj-row-tags"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration:0.3, delay: hovered ? 0.05 : 0 }}
        >
          {project.stack.slice(0,4).map((t)=>(
            <span key={t} className="proj-row-tag">{t}</span>
          ))}
        </motion.div>
      </div>

      {/* Période */}
      <motion.span
        className="proj-row-period"
        animate={{ opacity: hovered ? 0.85 : 0.3 }}
        transition={{ duration:0.25 }}
      >
        {project.period}
      </motion.span>

      {/* Flèche */}
      <motion.div
        className="proj-row-arrow"
        animate={{
          opacity: hovered ? 1 : 0,
          x: hovered ? 0 : -12,
          backgroundColor: hovered ? "var(--gold)" : "transparent",
        }}
        transition={{ duration:0.3 }}
      >
        <motion.span
          animate={{ color: hovered ? "var(--bg)" : "var(--gold)" }}
          style={{ fontSize:"1.1rem", lineHeight:1 }}
        >→</motion.span>
      </motion.div>

      {/* Aperçu image flottante */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="proj-row-preview"
            initial={{ opacity:0, scale:0.8, rotate:-4, y:20 }}
            animate={{ opacity:1, scale:1,   rotate:-2, y:0  }}
            exit={{ opacity:0,    scale:0.8, rotate:-4, y:20 }}
            transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
            style={{ x:iX, y:iY }}
          >
            <img src={project.image} alt={project.title}/>
            {/* Reflet doré en bas */}
            <div className="proj-preview-shine"/>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Composant principal ───────────────────────────────── */
export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="projects-section">

      <motion.p className="sec-label" initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
        Réalisations
      </motion.p>

      <div className="proj-header-row">
        <motion.h2 className="sec-title" style={{ marginBottom:0 }} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}>
          Projets Web
        </motion.h2>
        <motion.span className="proj-total-badge" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.25 }}>
          {projects.length} projets
        </motion.span>
      </div>

      <motion.p
        className="proj-hint"
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        viewport={{ once:true }}
        transition={{ delay:0.3 }}
      >
        Survolez pour apercevoir · Cliquez pour tout voir
      </motion.p>

      {/* Séparateur haut */}
      <motion.div
        className="proj-sep"
        initial={{ scaleX:0 }}
        whileInView={{ scaleX:1 }}
        viewport={{ once:true }}
        transition={{ duration:0.8, delay:0.2, ease:[0.22,1,0.36,1] }}
        style={{ originX:0 }}
      />

      {/* Liste */}
      <div className="proj-list">
        {projects.map((p,i)=>(
          <ProjectRow key={p.id} project={p} index={i} onClick={setSelected}/>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={()=>setSelected(null)}/>
        )}
      </AnimatePresence>

    </section>
  );
}