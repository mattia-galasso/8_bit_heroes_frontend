export default function WelcomePopUp() {
  return (
    <div className="welcome-popup modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header position-relative py-4">
            <h1 className="modal-title text-center fw-bold m-0">Welcome!</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <p className="text-center">
              Benvenuto su <strong>8-Bit Heroes</strong> Videogame Store
            </p>
            <p className="text-center">
              Iscriviti alla nostra Newsletter per rimanere aggiornato su nuove uscite e promozioni
              esclusive!
            </p>
            <label htmlFor="newsletter-input" className="form-label">
              Inserisci il tuo indirizzo email
            </label>
            <div className="input-group">
              <span className="input-group-text" id="visible-addon">
                @
              </span>
              <input
                id="newsletter-input"
                type="email"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="visible-addon"
              />
              <input
                type="email"
                className="form-control d-none"
                placeholder="Hidden input"
                aria-label="Hidden input"
                aria-describedby="visible-addon"
              />
              <span class="input-group-text" id="basic-addon2">
                @
              </span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary align-self-end"
              data-bs-dismiss="modal"
            >
              Magari no
            </button>
            <button type="button" className="btn btn-success fs-4">
              Iscrivimi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
