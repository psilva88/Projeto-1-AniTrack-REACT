import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  // contas salvas
  const [contas, setContas] = useState([]);

  function login(dados) {
    // dados:  nome e email
    setUsuario(dados);
    setContas((prev) => {
      const jaExiste = prev.find((c) => c.email === dados.email);
      if (jaExiste) return prev;
      return [...prev, dados];
    });
  }

  function logout() {
    setUsuario(null);
  }

  function trocarConta(conta) {
    setUsuario(conta);
  }

  return (
    <AuthContext.Provider value={{ usuario, contas, login, logout, trocarConta }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
