export default function OffcanvasCart() {
  return (
    <>
      {/* RIMUOVERE CLASSE SHOW PRIMA DI UTILIZZARLO */}

      <div
        class="offcanvas offcanvas-end show text-bg-dark"
        tabindex="-1"
        id="cartOffcanvas"
        aria-labelledby="cartOffcanvas"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            Carrello
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">...</div>
      </div>
    </>
  );
}
