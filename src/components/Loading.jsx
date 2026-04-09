export default function Loading() {
  return (
    <>
      <div className="loading-overlay">
        <div className="loading-spinner-wrap">
          <div className="loading-ring1"></div>
          <div className="loading-ring2"></div>
          <img
            src="/8bit_heroes_loading.png"
            alt="8BitHeroes Loading"
            className="loading-logo"
          />
        </div>
      </div>
    </>
  );
}
