import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { CatalogPage } from "./pages/CatalogPage";

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
        <Toaster richColors position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:companyId" element={<CatalogPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
