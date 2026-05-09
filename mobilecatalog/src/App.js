import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { CatalogPage } from "./pages/CatalogPage";
import { LandingPage } from "./pages/LandingPage";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster richColors position="top-center" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:companyId" element={<CatalogPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
