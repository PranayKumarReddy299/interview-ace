import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<string>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be within AuthProvider");
  return ctx;
};

// Mock user store
const USERS_KEY = "sip_users";
const TOKEN_KEY = "sip_token";
const OTP_KEY = "sip_otps";

const getUsers = (): Record<string, User & { password: string }> => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); } catch { return {}; }
};
const saveUsers = (u: Record<string, User & { password: string }>) => localStorage.setItem(USERS_KEY, JSON.stringify(u));
const getOTPs = (): Record<string, { otp: string; expiry: number }> => {
  try { return JSON.parse(localStorage.getItem(OTP_KEY) || "{}"); } catch { return {}; }
};
const saveOTPs = (o: Record<string, { otp: string; expiry: number }>) => localStorage.setItem(OTP_KEY, JSON.stringify(o));

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const users = getUsers();
      const u = users[token];
      if (u && u.isVerified) {
        const { password, ...userData } = u;
        setUser(userData);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const users = getUsers();
    const found = Object.values(users).find(u => u.email === email);
    if (!found) throw new Error("No account found with this email");
    if (found.password !== password) throw new Error("Incorrect password");
    if (!found.isVerified) throw new Error("Account not verified. Please verify your email first.");
    localStorage.setItem(TOKEN_KEY, found.id);
    const { password: _, ...userData } = found;
    setUser(userData);
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const users = getUsers();
    if (Object.values(users).find(u => u.email === email)) throw new Error("Email already registered");
    const id = crypto.randomUUID();
    const newUser = { id, name, email, password, isVerified: false, createdAt: new Date().toISOString() };
    users[id] = newUser;
    saveUsers(users);
    const otp = generateOTP();
    const otps = getOTPs();
    otps[email] = { otp, expiry: Date.now() + 10 * 60 * 1000 };
    saveOTPs(otps);
    console.log(`📧 OTP for ${email}: ${otp}`);
    return otp;
  }, []);

  const verifyOTP = useCallback(async (email: string, otp: string) => {
    await new Promise(r => setTimeout(r, 600));
    const otps = getOTPs();
    const stored = otps[email];
    if (!stored || stored.otp !== otp) throw new Error("Invalid OTP");
    if (Date.now() > stored.expiry) throw new Error("OTP expired");
    const users = getUsers();
    const found = Object.values(users).find(u => u.email === email);
    if (found) {
      found.isVerified = true;
      users[found.id] = found;
      saveUsers(users);
      localStorage.setItem(TOKEN_KEY, found.id);
      const { password, ...userData } = found;
      setUser(userData);
    }
    delete otps[email];
    saveOTPs(otps);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await new Promise(r => setTimeout(r, 800));
    const users = getUsers();
    const found = Object.values(users).find(u => u.email === email);
    if (!found) throw new Error("No account found with this email");
    const otp = generateOTP();
    const otps = getOTPs();
    otps[`reset_${email}`] = { otp, expiry: Date.now() + 10 * 60 * 1000 };
    saveOTPs(otps);
    console.log(`📧 Password Reset OTP for ${email}: ${otp}`);
    return otp;
  }, []);

  const resetPassword = useCallback(async (email: string, otp: string, newPassword: string) => {
    await new Promise(r => setTimeout(r, 600));
    const otps = getOTPs();
    const stored = otps[`reset_${email}`];
    if (!stored || stored.otp !== otp) throw new Error("Invalid OTP");
    if (Date.now() > stored.expiry) throw new Error("OTP expired");
    const users = getUsers();
    const found = Object.values(users).find(u => u.email === email);
    if (found) {
      found.password = newPassword;
      users[found.id] = found;
      saveUsers(users);
    }
    delete otps[`reset_${email}`];
    saveOTPs(otps);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, verifyOTP, logout, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
