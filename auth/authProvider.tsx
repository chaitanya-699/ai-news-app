import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { User } from "../interfaces/interfaces";
import { AuthContext } from "./authContext";

export const AuthProvider: any = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token on startup
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) setToken(storedToken);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async ({ token, user }: { token: string; user: User }) => {
    setUser(user);
    console.log("user : ", user);
    setToken(token);
    await SecureStore.setItemAsync("token", token);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await SecureStore.deleteItemAsync("token");
  };
  return (
    <AuthContext.Provider
      value={{ user, token, setToken, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
