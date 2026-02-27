import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem("ids_user");
    return saved ? JSON.parse(saved) : null;
  });

  const getRegisteredUsers = (): any[] => {
    const saved = localStorage.getItem("ids_registered_users");
    return saved ? JSON.parse(saved) : [];
  };

  const login = (email: string, password: string) => {
    const users = getRegisteredUsers();
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      const u = { email: foundUser.email, name: foundUser.name };
      setUser(u);
      localStorage.setItem("ids_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    const users = getRegisteredUsers();
    if (users.some((u) => u.email === email)) {
      return false; // User already exists
    }

    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("ids_registered_users", JSON.stringify(updatedUsers));

    // Automatically log in after registration
    const u = { email, name };
    setUser(u);
    localStorage.setItem("ids_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ids_user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

