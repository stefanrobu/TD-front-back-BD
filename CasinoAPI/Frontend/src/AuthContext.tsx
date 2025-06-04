// src/AuthContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
  user?: string;
  avatarUrl?: string;                 // Avatarul curent (URL sau base64)
  setAvatarUrl: (url: string) => void; // Funcție pentru schimbarea avatarului
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: undefined,
  avatarUrl: undefined,
  setAvatarUrl: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string | undefined>(undefined);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const login = (username: string) => {
    setIsLoggedIn(true);
    setUser(username);

    // Poți seta un avatar implicit la login, de exemplu:
    setAvatarUrl("/images/avatars/default.png");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(undefined);
    setAvatarUrl(undefined);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, avatarUrl, setAvatarUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
