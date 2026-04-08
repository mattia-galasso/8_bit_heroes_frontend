import axios from "axios";
import { useState } from "react";
import { useNotificationContext } from "../contexts/NotificationContext";

export default function WelcomePopUp({ onClose }) {
  const [inputData, setInputData] = useState("");
  const { showNotification } = useNotificationContext();
  const [status, setStatus] = useState("welcome");

  const email = inputData.trim().toLowerCase();

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

    //* Se l'email input è vuoto
    if (email.length === 0) {
      return showNotification(
        `L'indirizzo email è obbligatorio per iscrizione!`,
        "warning",
      );
    }

    //* Se l'email input contiene caratteri non accettati
    if (!regex.test(email)) {
      return showNotification(`L'indirizzo email non è valido!`, "warning");
    }

    axios
      .post("http://localhost:3000/newsletter", { email: email })
      .then(() => {
        setStatus("thanks");
        showNotification(`Registrazione avvenuta con successo!`, "success");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          showNotification(
            `L'indirizzo email "${email}" risulta già registrato!`,
            "warning",
          );
          return setInputData("");
        }
        showNotification(`Qualcosa è andato storto!`, "danger");
        setInputData("");
      });
  };

  return (
    <>
      {status === "welcome" && (
        <div
          className="welcome-popup modal show d-block"
          tabIndex="-1"
          data-bs-theme="dark"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header position-relative py-4">
                <h1 className="modal-title text-warning text-center fw-bold m-0">
                  Welcome!
                </h1>
                <button
                  onClick={onClose}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-center fs-5">
                  Benvenuto su{" "}
                  <strong className="text-warning">8-Bit Heroes</strong>{" "}
                  Videogame Store
                </p>
                <p className="text-center">
                  Iscriviti alla nostra Newsletter per rimanere aggiornato su
                  nuove uscite e promozioni esclusive!
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
                      type="text"
                      className="form-control"
                      placeholder="..."
                      aria-label="Username"
                      aria-describedby="visible-addon"
                    />
                    <button
                      className="btn btn-success"
                      type="submit"
                      id="button-addon2"
                    >
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
      )}
      {status === "thanks" && (
        <div
          className="welcome-popup thanks-modal modal show d-block"
          tabIndex="-1"
          data-bs-theme="dark"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  onClick={onClose}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center">
                <h1 className="text-warning mb-3">Ottima scelta!</h1>
                <p className="mb-1">
                  Verrai informato/a su tutte le novità su l'indirizzo email "
                  {email}"
                </p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={onClose}
                  type="button"
                  className="btn btn-warning align-self-end"
                  data-bs-dismiss="modal"
                >
                  Procedi al Sito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
