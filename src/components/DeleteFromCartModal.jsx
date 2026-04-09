import { useCart } from "../contexts/CartContext";
import { useNotificationContext } from "../contexts/NotificationContext";

export default function DeleteFromCartModal({
  gameToDelete,
  setOpenDeleteModal,
}) {
  const { removeFromCart } = useCart();
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
                onClick={() => setOpenDeleteModal(false)}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p className="fs-5">
                Sei sicuro di voler eliminare{" "}
                <span className="text-warning">{gameToDelete.name}</span> dal
                tuo carrello?
              </p>
              <div className="d-flex gap-4 justify-content-center">
                <button
                  onClick={() => {
                    removeFromCart(gameToDelete.id);
                    showNotification(
                      `"${gameToDelete.name}" Rimosso dal carrello!`,
                      "danger",
                    );
                    setOpenDeleteModal(false);
                  }}
                  className="btn btn-primary btn-lg"
                >
                  SI
                </button>
                <button
                  onClick={() => setOpenDeleteModal(false)}
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
  );
}
