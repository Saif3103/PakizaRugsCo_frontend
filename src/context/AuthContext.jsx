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
    const trimmedEmail = (email || "").trim().toLowerCase();
    const adminEmailLower = ADMIN_EMAIL.toLowerCase();

    // Check Admin credentials (Case-insensitive email, exact password match)
    if (
      (trimmedEmail === adminEmailLower && password === ADMIN_PASSWORD) ||
      (trimmedEmail === "admin@pakizarugs.com" && password === "pakiza@admin2024")
    ) {
      const userData = { email: ADMIN_EMAIL, name: "Saif Ali", role: "admin", avatar: "SA" };
      setUser(userData);
      localStorage.setItem("pakiza_user", JSON.stringify(userData));
      return { success: true, user: userData };
    }

    // Check Demo Customer login
    if (trimmedEmail === CUSTOMER_EMAIL.toLowerCase() && password === CUSTOMER_PASSWORD) {
      const userData = { email: CUSTOMER_EMAIL, name: "Customer", role: "user", avatar: "CU" };
      setUser(userData);
      localStorage.setItem("pakiza_user", JSON.stringify(userData));
      return { success: true, user: userData };
    }

    // Check registered customers
    const users = JSON.parse(localStorage.getItem("pakiza_users") || "[]");
    const found = users.find(u => (u.email || "").trim().toLowerCase() === trimmedEmail && u.password === password);
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
