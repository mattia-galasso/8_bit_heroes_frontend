import { Link } from "react-router";
import "../assets/css/page404.css"

export default function Page404() {

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center text-center card-bg hv-80">
            <h1 className="display-1 fw-bold text-warning glow-text">
                404
            </h1>

            <h2 className="text-light mb-3">
                Livello non trovato 🎮
            </h2>

            <p className="text-secondary mb-4">
                Sembra che questa pagina sia stata sconfitta...
                oppure non è mai esistita 👀
            </p>

            <div className="mb-4">
                <img
                    src="/8bit_heroes_logo.png"
                    alt="8 Bit Heroes"
                    className="logo"
                />
            </div>
            <div className="d-flex gap-3">
                <Link to="/" className="btn btn-warning fw-bold px-4">
                    🏠 Torna alla Home
                </Link>

                <Link to="/games" className="btn btn-outline-warning px-4">
                    🎮 Vai allo Store
                </Link>
            </div>
        </div>
    );
}