import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Define components for the routes
const RemoteHome = () => (
  <div>
    <h2>Remote App Home</h2>
    <p>Esta é a página inicial do micro frontend remoto.</p>
    <p>Este componente é carregado pelo container usando Module Federation.</p>
  </div>
);

const RemoteFeature = () => (
  <div>
    <h2>Remote Feature</h2>
    <p>Este é um recurso específico do micro frontend remoto.</p>
    <p>Você pode adicionar qualquer funcionalidade específica aqui.</p>
  </div>
);

const RemoteSettings = () => (
  <div>
    <h2>Remote Settings</h2>
    <p>Página de configurações do micro frontend remoto.</p>
    <p>Aqui você pode gerenciar configurações específicas deste módulo.</p>
  </div>
);

// Main App component
const App = () => {
  const navigate = useNavigate();

  // Handle navigation from container
  useEffect(() => {
    // This allows the container to control the internal routes of the remote app
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'NAVIGATE') {
        navigate(event.data.path || '/');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  return (
    <div className="remote-container">
      <header className="remote-header">
        <h1>Micro Frontend Remoto</h1>
      </header>
      
      <nav className="remote-nav">
        <Link to="/">Home</Link>
        <Link to="/feature">Feature</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      
      <div className="remote-content">
        <Routes>
          <Route path="/" element={<RemoteHome />} />
          <Route path="/feature" element={<RemoteFeature />} />
          <Route path="/settings" element={<RemoteSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
