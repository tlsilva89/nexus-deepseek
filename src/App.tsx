import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import SetupGuide from "./pages/SetupGuide";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirecionamento da raiz para a página de setup */}
        <Route path="/" element={<Navigate to="/setup" replace />} />

        {/* Rota para o chat após configuração */}
        <Route path="/chat" element={<ChatPage />} />

        {/* Rota do guia de configuração */}
        <Route path="/setup" element={<SetupGuide />} />

        {/* Página 404 personalizada */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-dark-bg text-gray-200 flex items-center justify-center p-4">
              <div className="text-center">
                <h1 className="text-4xl font-tech text-neon-purple mb-4">
                  404 - Página não encontrada
                </h1>
                <a
                  href="/chat"
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
