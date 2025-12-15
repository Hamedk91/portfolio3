export default function Design() {
  const affiches = [
    "/images/Timberland1 .png",
    "/images/Timberland2.png",
    "/images/Timberland3.png",
    "/images/Timberland1 .png",
    "/images/Timberland2.png",
    "/images/Timberland3.png",
  ];

  return (
    <section id="design" className="section">
      <h2>Design & Affiches</h2>
      <p className="design-hint">
        Défilement continu – inspiration galerie
      </p>

      <div className="marquee">
        <div className="marquee-track">
          {affiches.map((src, index) => (
            <div className="marquee-card" key={index}>
              <img src={src} alt="Affiche design" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
