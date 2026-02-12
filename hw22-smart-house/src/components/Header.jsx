export default function Header({ subtitle }) {
  return (
    <header className="sh-header">
      <div className="sh-brand">
        <div className="sh-logo">🏠</div>
        <div>
          <h1 className="sh-title">Smart house</h1>
          <p className="sh-subtitle">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
