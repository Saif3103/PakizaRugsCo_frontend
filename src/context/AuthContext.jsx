import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const ADMIN_EMAIL = "admin@pakizarugs.com";
const ADMIN_PASSWORD = "pakiza@admin2024";

const CUSTOMER_EMAIL = "customer@pakizarugs.com";
const CUSTOMER_PASSWORD = "customer123";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("pakiza_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem("pakiza_user"); }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const userData = { email, name: "Admin", role: "admin", avatar: "AD" };
      setUser(userData);
      localStorage.setItem("pakiza_user", JSON.stringify(userData));
      return { success: true };
    }
    if (email.toLowerCase() === CUSTOMER_EMAIL && password === CUSTOMER_PASSWORD) {
      const userData = { email: CUSTOMER_EMAIL, name: "Saif Ali", role: "user", avatar: "SA" };
      setUser(userData);
      localStorage.setItem("pakiza_user", JSON.stringify(userData));
      return { success: true };
    }
    const users = JSON.parse(localStorage.getItem("pakiza_users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const userData = { email: found.email, name: found.name, role: "user", avatar: found.name.slice(0, 2).toUpperCase() };
      setUser(userData);
      localStorage.setItem("pakiza_user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("pakiza_users") || "[]");
    if (users.find(u => u.email === email)) {
      return { success: false, error: "Email already registered" };
    }
    const newUser = { name, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem("pakiza_users", JSON.stringify(users));
    const userData = { email, name, role: "user", avatar: name.slice(0, 2).toUpperCase() };
    setUser(userData);
    localStorage.setItem("pakiza_user", JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pakiza_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
