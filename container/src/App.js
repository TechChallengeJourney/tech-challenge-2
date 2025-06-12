import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RemoteAppWrapper from './RemoteAppWrapper';

// Local components
const Home = () => (
  <div>
    <h2>Página Inicial</h2>
    <p>Esta é a aplicação container principal.</p>
    <p>Este container carrega e gerencia os micro frontends remotos.</p>
  </div>
);

const About = () => (
  <div>
    <h2>Sobre</h2>
    <p>Informações sobre a aplicação container.</p>
    <p>Este exemplo demonstra como usar o Module Federation do Webpack 5 para criar micro frontends.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="container">        <header className="header">
          <h1>Demo de Micro Frontend</h1>
        </header>
        
        <nav className="nav">
          <Link to="/">Início</Link>
          <Link to="/about">Sobre</Link>
          <Link to="/remote">Micro Frontend</Link>
        </nav>
        
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/remote/*" element={<RemoteAppWrapper />} />
            </Routes>
          </Suspense>
        </div>
          <footer className="footer">
          <p>&copy; 2025 Demonstração de Micro Frontends com Module Federation</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
