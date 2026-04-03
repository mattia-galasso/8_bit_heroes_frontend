import axios from "axios";
import { useState } from "react";

export default function WelcomePopup({ onClose }) {
  const [inputData, setInputData] = useState("");

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/newsletter", { email: inputData.trim().toLowerCase() })
      .then((res) => {
        console.log(res.data);
      });

    setInputData("");

    onClose();
  };

  return (
    <div className="welcome-popup modal show d-block" tabIndex="-1" data-bs-theme="dark">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header position-relative py-4">
            <h1 className="modal-title text-warning text-center fw-bold m-0">Welcome!</h1>
            <button
              onClick={onClose}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p className="text-center">
              Benvenuto su <strong className="text-warning">8-Bit Heroes</strong> Videogame Store
            </p>
            <p className="text-center">
              Iscriviti alla nostra Newsletter per rimanere aggiornato su nuove uscite e promozioni
              esclusive!
            </p>
            <label htmlFor="newsletter-input" className="form-label">
              Inserisci il tuo indirizzo email
            </label>
            <form onSubmit={handleFormSubmit}>
              <div className="input-group">
                <input
                  value={inputData}
                  onChange={handleInputChange}
                  id="newsletter-input"
                  type="email"
                  className="form-control"
                  placeholder="..."
                  aria-label="Username"
                  aria-describedby="visible-addon"
                  required
                />
                <button className="btn btn-success" type="submit" id="button-addon2">
                  Iscrivimi
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              onClick={onClose}
              type="button"
              className="btn btn-secondary align-self-end"
              data-bs-dismiss="modal"
            >
              Magari no
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
