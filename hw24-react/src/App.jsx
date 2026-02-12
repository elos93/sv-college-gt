import Products from "./Products";
import "./index.css";

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <h1> Product Filter App </h1>
        <p className="subtitle"></p>
      </header>

      <main className="container">
        <Products />
      </main>

      <footer className="footer">
        <span>Data source: dummyjson.com/products</span>
      </footer>
    </div>
  );
}

export default App;
