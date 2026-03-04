import { motion } from "framer-motion";

/* ── SVG Icons aux couleurs du site ──────────────────────
   Chaque icône est un composant SVG inline.
   Couleurs : --gold #F7DC4F  |  --salmon #C17F6A  |  --white #FAF7F4
─────────────────────────────────────────────────────────── */

const IconGmail = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* enveloppe fond sombre */}
    <rect width="48" height="48" rx="6" fill="#2B2420"/>
    {/* rabat supérieur – triangle or */}
    <path d="M6 14L24 28L42 14" stroke="#F7DC4F" strokeWidth="2.5" strokeLinejoin="round"/>
    {/* corps enveloppe – contour saumon */}
    <rect x="6" y="14" width="36" height="24" rx="2"
          stroke="#C17F6A" strokeWidth="2.5" fill="none"/>
    {/* lettre M Gmail stylisée en or */}
    <path d="M14 20L24 28L34 20" stroke="#F7DC4F" strokeWidth="2" strokeLinejoin="round" fill="none"/>
  </svg>
);

const IconGitHub = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="6" fill="#2B2420"/>
    {/* Octocat simplifié aux couleurs du site */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 8C15.163 8 8 15.163 8 24c0 7.08 4.59 13.09 10.96 15.21.8.147 1.093-.347 1.093-.77 0-.38-.013-1.387-.02-2.722-4.45.967-5.39-2.144-5.39-2.144-.728-1.85-1.776-2.343-1.776-2.343-1.452-.993.11-.973.11-.973 1.606.113 2.452 1.649 2.452 1.649 1.428 2.446 3.746 1.74 4.66 1.33.145-1.034.559-1.74 1.016-2.14-3.553-.404-7.288-1.777-7.288-7.908 0-1.747.624-3.175 1.647-4.295-.165-.404-.714-2.03.156-4.232 0 0 1.343-.43 4.4 1.64A15.32 15.32 0 0124 15.9c1.36.007 2.728.184 4.007.539 3.055-2.07 4.396-1.64 4.396-1.64.872 2.203.323 3.828.158 4.232 1.026 1.12 1.645 2.548 1.645 4.295 0 6.145-3.742 7.5-7.306 7.895.575.494 1.086 1.47 1.086 2.963 0 2.14-.02 3.865-.02 4.392 0 .427.288.924 1.1.768C35.415 37.084 40 31.077 40 24c0-8.837-7.163-16-16-16z"
      fill="#F7DC4F"
    />
  </svg>
);

const IconPhone = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="6" fill="#2B2420"/>
    <path
      d="M16 10h16a3 3 0 013 3v22a3 3 0 01-3 3H16a3 3 0 01-3-3V13a3 3 0 013-3z"
      stroke="#C17F6A" strokeWidth="2.5" fill="none"
    />
    {/* écran */}
    <rect x="17" y="15" width="14" height="16" rx="1" fill="#F7DC4F" opacity="0.15"/>
    {/* bouton home */}
    <circle cx="24" cy="35" r="1.5" fill="#F7DC4F"/>
    {/* antenne signal */}
    <path d="M20 13h8" stroke="#C17F6A" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconLocation = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="6" fill="#2B2420"/>
    <path
      d="M24 10c-5.523 0-10 4.477-10 10 0 7.5 10 18 10 18s10-10.5 10-18c0-5.523-4.477-10-10-10z"
      stroke="#C17F6A" strokeWidth="2.5" fill="none"
    />
    <circle cx="24" cy="20" r="3.5" fill="#F7DC4F"/>
  </svg>
);

/* ── Données contact ─────────────────────────────────── */
const contactItems = [
  {
    Icon:  IconGmail,
    label: "Email",
    value: "hamed2004150@gmail.com",
    href:  "mailto:hamed2004150@gmail.com",
  },
  {
    Icon:  IconPhone,
    label: "Téléphone",
    value: "07 67 34 48 48",
    href:  "tel:0767344848",
  },
  {
    Icon:  IconLocation,
    label: "Localisation",
    value: "France — disponible en remote",
    href:  null,
  },
];

/* ── Liens réseaux sociaux ───────────────────────────── */
const socials = [
  {
    Icon:  IconGitHub,
    label: "GitHub",
    sub:   "Hamedk91",
    href:  "https://github.com/Hamedk91",
  },
  {
    Icon:  IconGmail,
    label: "Gmail",
    sub:   "hamed2004150@gmail.com",
    href:  "mailto:hamed2004150@gmail.com",
  },
];

export default function Contact() {
  return (
    <div className="contact-section" id="contact">
      <div className="contact-inner">

        {/* ── HEADER ────────────────────────────────── */}
        <motion.p
          className="sec-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.p>

        <motion.h2
          className="sec-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Travaillons ensemble.
        </motion.h2>

        {/* ── GRID ──────────────────────────────────── */}
        <div className="contact-grid">

          {/* Colonne gauche — coordonnées */}
          <motion.div
            className="contact-list"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {contactItems.map((item) => (
              <div
                className="contact-item"
                key={item.label}
                style={{ cursor: item.href ? "pointer" : "default" }}
                onClick={() => item.href && window.open(item.href, "_blank")}
              >
                {/* Icône SVG personnalisée */}
                <div className="contact-icon-svg">
                  <item.Icon />
                </div>
                <div className="contact-detail">
                  <strong>{item.label}</strong>
                  {item.value}
                </div>
              </div>
            ))}

            {/* ── Liens réseaux ─────────────────────── */}
            <div className="social-row">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-card"
                  whileHover={{ y: -4, borderColor: "var(--gold)" }}
                  transition={{ duration: 0.2 }}
                  title={s.label}
                >
                  <s.Icon />
                  <div className="social-info">
                    <span className="social-label">{s.label}</span>
                    <span className="social-sub">{s.sub}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Colonne droite — CTA */}
          <motion.div
            className="contact-cta"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p>
              Je suis ouvert aux opportunités de stage ou d'alternance.
              N'hésitez pas à me contacter pour discuter de vos projets
              ou d'une éventuelle collaboration.
            </p>
            <a
              href="mailto:hamed2004150@gmail.com"
              className="btn-gold"
              style={{ alignSelf: "flex-start", marginBottom: "16px" }}
            >
              M'envoyer un email
            </a>
            <a
              href="https://github.com/Hamedk91"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{ alignSelf: "flex-start" }}
            >
              Voir mon GitHub
            </a>
          </motion.div>

        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────── */}
      <div className="footer-bar">
        <span>© 2025 Hamed Konaté — Tous droits réservés</span>
        <span>Étudiant MMI · Développeur Web</span>
      </div>
    </div>
  );
}