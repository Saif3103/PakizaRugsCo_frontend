import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const ADMIN_EMAIL = "Saifali@706891@gmail.com";
const ADMIN_PASSWORD = "Saif@706891";

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
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = (password || "").trim();

    // Check Admin credentials
    const isAdminEmail = (
      cleanEmail === "saifali@706891@gmail.com" ||
      cleanEmail === "saifali706891@gmail.com" ||
      cleanEmail === "saifali@706891" ||
      cleanEmail === "saifali706891" ||
      cleanEmail === "706891" ||
      cleanEmail === "admin@pakizarugs.com"
    );

    const isAdminPassword = (
      cleanPassword === "Saif@706891" ||
      cleanPassword.toLowerCase() === "saif@706891" ||
      cleanPassword === "pakiza@admin2024"
    );

    if (isAdminEmail && isAdminPassword) {
      const userData = { email: "Saifali@706891@gmail.com", name: "Saif Ali", role: "admin", avatar: "SA" };
      setUser(userData);
      localStorage.setItem("pakiza_user", JSON.stringify(userData));
      return { success: true, user: userData };
    }

    // Check Demo Customer login
    if (cleanEmail === CUSTOMER_EMAIL.toLowerCase() && cleanPassword === CUSTOMER_PASSWORD) {
      const userData = { email: CUSTOMER_EMAIL, name: "Customer", role: "user", avatar: "CU" };
      setUser(userData);
      localStorage.setItem("pakiza_user", JSON.stringify(userData));
      return { success: true, user: userData };
    }

    // Check registered customers
    const users = JSON.parse(localStorage.getItem("pakiza_users") || "[]");
    const found = users.find(u => (u.email || "").trim().toLowerCase() === cleanEmail && (u.password || "").trim() === cleanPassword);
    if (found) {
      const userData = { email: found.email, name: found.name, role: found.role || "user", avatar: (found.name || "U").slice(0, 2).toUpperCase() };
      setUser(userData);
      localStorage.setItem("pakiza_user", JSON.stringify(userData));
      return { success: true, user: userData };
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
