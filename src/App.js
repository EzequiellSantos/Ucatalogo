import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CatalogPage } from "./pages/CatalogPage"; // Certifique-se de que o caminho está correto

// Uma Home simples caso o usuário acesse apenas o localhost:3000/ sem nome de empresa
const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Digite o nome da empresa na URL (ex: /nike)</p>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<Home />} />

          {/* Rota Dinâmica: o ':companyId' aceita qualquer nome e envia para a CatalogPage */}
          <Route path="/:companyId" element={<CatalogPage />} />

          {/* Redirecionamento de segurança: se a rota não existir, volta para a home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;