import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

const RemoteAppWrapper = () => {
  const [RemoteApp, setRemoteApp] = useState(null);
  
  useEffect(() => {
    // Carrega o componente do micro frontend remoto
    import('remote/App')
      .then((module) => {
        setRemoteApp(() => module.default);
      })
      .catch((error) => {
        console.error('Erro ao carregar o micro frontend remoto:', error);
      });
  }, []);
  
  if (!RemoteApp) {
    return <div>Carregando Micro Frontend Remoto...</div>;
  }
  
  return <RemoteApp />;
};

export default RemoteAppWrapper;
