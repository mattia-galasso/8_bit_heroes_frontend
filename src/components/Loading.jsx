export default function Loading() {
  return (
    <>
      <div className="loading-overlay">
        <div className="loading-spinner-wrap">
          <div className="loading-ring1"></div>
          <div className="loading-ring2"></div>
        </div>
        <div className="loading-title">8 Bit Heroes</div>
        <div className="loading-subtitle">Caricamento in corso...</div>
      </div>
    </>
  );
}
