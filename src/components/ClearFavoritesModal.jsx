import { useFavorites } from "../contexts/FavoritesContext";
import { useNotificationContext } from "../contexts/NotificationContext";

export default function ClearFavoritesModal({ setOpenClearModal }) {
  const { clearFavorites } = useFavorites();
  const { showNotification } = useNotificationContext();
  

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        data-bs-theme="dark"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={() => setOpenClearModal(false)}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body text-center">
              <p className="fs-5">
                Sei sicuro di voler svuotare tutta la{" "}
                <span className="text-warning">wishlist</span>?
              </p>

              <div className="d-flex gap-4 justify-content-center">
                <button
                  onClick={() => {
                    clearFavorites();
                    showNotification("Wishlist svuotata con successo!", "warning")
                    setOpenClearModal(false)
                  }}
                  className="btn btn-primary btn-lg"
                >
                  SI
                </button>

                <button
                  onClick={() => setOpenClearModal(false)}
                  className="btn btn-secondary btn-lg"
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}