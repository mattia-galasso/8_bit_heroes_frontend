export default function Homepage() {
  return (
    <section className="homepage-container">
      {/* HERO */}
      <div className="card-bg hero-space">
        <div className="hero-space-text">
          <h1>
            Il tuo <span className="text-warning">Videogame Store</span> di fiducia
          </h1>
          <p>Giochi fisici e digitali per tutte le piattaforme.</p>
          <p>Spedizione rapida e prezzi competitivi.</p>
        </div>
        <div className="hero-space-image">
          <img src="8bit_heroes_logo.png" alt="Logo" className="img-fluid" />
        </div>
      </div>

      {/* OFFERTE */}
      <div className="card card-bg my-4">
        <h2 className="homepage-section-title h1 text-center text-warning my-1">OFFERTE EPICHE</h2>
        <div className="card card-bg">
          <ul>
            <li>image</li>
            <li>name</li>
            <li>price discount</li>
            <li>original price</li>
          </ul>
        </div>
      </div>

      {/* PIU' VENDUTI */}
      <div className="card card-bg">
        <h2 className="homepage-section-title h1 text-center text-warning my-1">I PIÙ VENDUTI</h2>
        <div className="card card-bg">
          <ul>
            <li>image</li>
            <li>name</li>
            <li>price</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
