import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { ChatPage } from "./pages/ChatPage";
import { LandingPage } from "./pages/LandingPage";

interface UserCredentials {
  email: string;
  password: string;
}

// Simular banco de dados de usuários (em produção, isso seria armazenado no servidor)
const mockUsers: UserCredentials[] = [
  { email: "usuario@exemplo.com", password: "123456" },
  { email: "teste@teste.com", password: "teste123" },
  // Add users from README.md
  { email: "karina@exemplo.com", password: "karina123" },
  { email: "admin@exemplo.com", password: "admin123" },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Função para autenticar usuário
  const handleLogin = (email: string, password: string) => {
    setIsLoggingIn(true);
    setLoginError("");

    // Simular verificação no servidor
    setTimeout(() => {
      const user = mockUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        setIsAuthenticated(true);
        // Extrair nome de usuário do email
        const nameFromEmail = email.split("@")[0];
        setUserName(nameFromEmail);
        setIsLoggingIn(false);
      } else {
        setLoginError("Email ou senha inválidos");
        setIsLoggingIn(false);
      }
    }, 1000);
  };

  // Função para fazer logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/app"
          element={
            isAuthenticated ? (
              <ChatPage userName={userName} onLogout={handleLogout} />
            ) : (
              <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <LoginForm
                  onLogin={handleLogin}
                  isLoading={isLoggingIn}
                  error={loginError}
                />
              </div>
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
