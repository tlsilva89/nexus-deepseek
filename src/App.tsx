import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage.tsx";
import SetupGuide from "./pages/SetupGuide.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/setup" element={<SetupGuide />} />

        {/* Rota para página não encontrada */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-dark-bg text-gray-200 flex items-center justify-center p-4">
              <div className="text-center">
                <h1 className="text-4xl font-tech text-neon-purple mb-4">
                  404 - Página não encontrada
                </h1>
                <a
                  href="/"
                  className="text-neon-blue hover:text-neon-purple transition-colors text-lg"
                >
                  Voltar para o chat principal
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
