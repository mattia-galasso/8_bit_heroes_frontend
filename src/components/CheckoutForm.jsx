import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import axios from "axios";
import { Link } from "react-router";
import { useNotificationContext } from "../contexts/NotificationContext";
import { useLoading } from "../contexts/LoadingContext";

export default function CheckoutForm({ setOpenForm }) {
  // CUSTOM HOOK
  const { cart, setCart } = useCart();

  const initialData = {
    name: "",
    surname: "",
    email: "",
    shipping_address: "",
    shipping_cap: "",
    shipping_city: "",
    shipping_country: "",
    billing_address: "",
    billing_cap: "",
    billing_city: "",
    billing_country: "",
    orderedProducts: [...cart],
  };

  // USE STATES
  const [formData, setFormData] = useState(initialData);
  const [sameAddress, setSameAddress] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(undefined);
  const { showNotification } = useNotificationContext();
  const { startLoading, endLoading } = useLoading();

  useEffect(() => {
    if (sameAddress) {
      setBillingInfos();
    }
  }, [
    sameAddress,
    formData.shipping_address,
    formData.shipping_cap,
    formData.shipping_city,
    formData.shipping_country,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const setBillingInfos = () => {
    setFormData({
      ...formData,
      billing_address: formData.shipping_address,
      billing_cap: formData.shipping_cap,
      billing_city: formData.shipping_city,
      billing_country: formData.shipping_country,
    });
  };

  const isValidCAP = (cap) => {
    // controlla la lunghezza del cap
    if (cap.length !== 5) return false;

    // controlla che tutti i caratteri siano numeri
    for (let i = 0; i < cap.length; i++) {
      if (cap[i] < "0" || cap[i] > "9") {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    const {
      name,
      surname,
      email,
      shipping_address,
      shipping_cap,
      shipping_city,
      shipping_country,
      billing_address,
      billing_cap,
      billing_city,
      billing_country,
    } = formData;

    if (!name.trim().toLowerCase()) {
      return showNotification("Compilare il campo Nome.", "warning");
    }
    if (!surname.trim().toLowerCase()) {
      return showNotification("Compilare il campo Cognome.", "warning");
    }
    if (!email.trim()) {
      return showNotification("Compila il campo Email", "warning");
    }
    if (!regex.test(email)) {
      return showNotification("Email non valida", "warning");
    }
    if (!shipping_address.trim()) {
      return showNotification("Inserisci l'indirizzo di spedizione", "warning");
    }
    if (!shipping_cap.trim()) {
      return showNotification("Inserisci il CAP di spedizione", "warning");
    }
    if (isValidCAP(shipping_cap.trim()) === false) {
      return showNotification("il CAP inserito non è valido", "warning");
    }
    if (!shipping_city.trim()) {
      return showNotification("Inserisci la citta di spedizione", "warning");
    }
    if (!shipping_country.trim()) {
      return showNotification("Inserisci la Nazione di spedizione", "warning");
    }
    if (!billing_address.trim()) {
      return showNotification(
        "Inserisci l'indirizzo di fatturazione",
        "warning",
      );
    }
    if (!billing_cap.trim()) {
      return showNotification("Inserisci il CAP di fatturazione", "warning");
    }
    if (isValidCAP(billing_cap.trim()) === false) {
      return showNotification("il CAP inserito non è valido", "warning");
    }
    if (!billing_city.trim()) {
      return showNotification("Inserisci la citta di fatturazione", "warning");
    }
    if (!billing_country.trim()) {
      return showNotification(
        "Inserisci la Nazione di fatturazione",
        "warning",
      );
    }

    startLoading();

    axios
      .post("http://localhost:3000/orders", formData)
      .then((res) => {
        endLoading();
        if (res.data) {
          setOrderSuccess(true);
          showNotification("Ordine effettuato con successo!", "success");
          console.log(res.data);
        }
        setCart([]);
      })
      .catch((err) => {
        endLoading();
        if (err) {
          setOrderSuccess(false);
          return showNotification("Qualcosa è andato storto!", "danger");
        }
        showNotification("Qualcosa è andato storto!", "danger");
      });
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div
        className="welcome-popup thanks-modal modal show d-block"
        tabIndex="-1"
        data-bs-theme="dark"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{ marginTop: "4rem" }}>
            <div className="modal-header">
              <button
                onClick={() => setOpenForm(false)}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {orderSuccess === undefined && (
                <>
                  <div className="text-center mb-3">
                    <h1 className="text-warning">Ordina ora!</h1>
                    <p>Inserisci i tuoi dati per completare l'ordine</p>
                  </div>

                  <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="row g-3 p-2"
                  >
                    <div className="col-12 col-sm-6">
                      <label htmlFor="name" className="form-label">
                        Nome
                      </label>
                      <input
                        value={formData.name}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="surname" className="form-label">
                        Cognome
                      </label>
                      <input
                        value={formData.surname}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        name="surname"
                        className="form-control"
                        id="surname"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        value={formData.email}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        name="email"
                        className="form-control"
                        id="email"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="shipping_address" className="form-label">
                        Indirizzo di spedizione
                      </label>
                      <input
                        value={formData.shipping_address}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        name="shipping_address"
                        className="form-control"
                        id="shipping_address"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="shipping_cap" className="form-label">
                        CAP di spedizione
                      </label>
                      <input
                        value={formData.shipping_cap}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        name="shipping_cap"
                        className="form-control"
                        id="shipping_cap"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="shipping_city" className="form-label">
                        Citta di spedizione
                      </label>
                      <input
                        value={formData.shipping_city}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        name="shipping_city"
                        className="form-control"
                        id="shipping_city"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="shipping_country" className="form-label">
                        Nazione di spedizione
                      </label>
                      <input
                        value={formData.shipping_country}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        name="shipping_country"
                        className="form-control"
                        id="shipping_country"
                      />
                    </div>
                    <div className="col-12 ms-1">
                      <div className="form-check">
                        <input
                          checked={sameAddress}
                          onChange={() => setSameAddress(!sameAddress)}
                          type="checkbox"
                          name="sameAddress"
                          className="form-check-input"
                          id="sameAddress"
                        />
                        <label
                          htmlFor="sameAddress"
                          className="form-check-label"
                        >
                          Indirizzo di spedizione uguale a indirizzo di
                          fatturazione
                        </label>
                      </div>
                    </div>

                    {!sameAddress && (
                      <>
                        <div className="col-12 col-sm-6">
                          <label
                            htmlFor="billing_address"
                            className="form-label"
                          >
                            Indirizzo di fatturazione
                          </label>
                          <input
                            value={formData.billing_address}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            name="billing_address"
                            className="form-control"
                            id="billing_address"
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <label htmlFor="billing_cap" className="form-label">
                            CAP di fatturazione
                          </label>
                          <input
                            value={formData.billing_cap}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            name="billing_cap"
                            className="form-control"
                            id="billing_cap"
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <label htmlFor="billing_city" className="form-label">
                            Citta di fatturazione
                          </label>
                          <input
                            value={formData.billing_city}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            name="billing_city"
                            className="form-control"
                            id="billing_city"
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <label
                            htmlFor="billing_country"
                            className="form-label"
                          >
                            Nazione di fatturazione
                          </label>
                          <input
                            value={formData.billing_country}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            name="billing_country"
                            className="form-control"
                            id="billing_country"
                          />
                        </div>
                      </>
                    )}

                    <div className="d-flex justify-content-end">
                      <button className="btn btn-primary">Invia</button>
                    </div>
                  </form>
                </>
              )}

              {orderSuccess === true && (
                <>
                  <div className="d-flex flex-column gap-4 align-items-center">
                    <h1>
                      Ordine effettuato con{" "}
                      <span className="text-warning glow-text">Successo</span>
                    </h1>
                    <i className="bi bi-check-circle-fill text-success fs-1"></i>
                    <h2>Grazie per aver acquistato da noi.</h2>
                    <div className="d-flex gap-3">
                      <Link to="/" className="btn btn-warning fw-bold px-4">
                        🏠 Torna alla Home
                      </Link>

                      <Link
                        to="/cart"
                        onClick={() => setOpenForm(false)}
                        className="btn btn-outline-warning px-4"
                      >
                        🛒 Vai al Carrello
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {orderSuccess === false && (
                <>
                  <div className="d-flex flex-column gap-4 align-items-center">
                    <h1>
                      Ordine{" "}
                      <span className="text-warning glow-text">Fallito</span>
                    </h1>
                    <i className="bi bi-x-octagon-fill text-danger fs-1"></i>
                    <h2>Riprova.</h2>
                    <div className="d-flex gap-3">
                      <Link to="/" className="btn btn-warning fw-bold px-4">
                        🏠 Torna alla Home
                      </Link>

                      <Link
                        to="/cart"
                        onClick={() => setOpenForm(false)}
                        className="btn btn-outline-warning px-4"
                      >
                        🛒 Vai al Carrello
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
