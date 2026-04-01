export default function Homepage() {
  return (
    <>
      <div className="homepage-box">
        <div className="homepage-container">
          {/* HEADER E SLOGAN INIZIALE */}
          <div className="card-bg header-homepage-slogan">
            <div className="homepage-header-text">
              <h1>
                Il tuo <span className="text-warning">Videogame Store</span> di
                fiducia
              </h1>
              <p>Giochi fisici e digitali per tutte le piattaforme.</p>
              <p>Spedizione rapida e prezzi competitivi.</p>
            </div>
            <div className="homepage-header-image">
              <img
                src="8bit_heroes_logo.png"
                alt="Logo"
                className="img-fluid"
              />
            </div>
          </div>

          {/* OFFERTE EPICHE */}
          <div className="card card-bg my-4">
            <h2 className="h1 text-center my-1">OFFERTE EPICHE</h2>
            <div className="card card-bg">
              <ul>
                <li>image</li>
                <li>name</li>
                <li>price discount</li>
                <li>original price</li>
              </ul>
            </div>
          </div>

          {/* I PIU' VENDUTI */}
          <div className="card card-bg">
            <h2 className="h1 text-center my-1">I PIÙ VENDUTI</h2>
            <div className="card card-bg">
              <ul>
                <li>image</li>
                <li>name</li>
                <li>price</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
