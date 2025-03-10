import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Platform } from "react-native";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const getToken = async () => {
    if (Platform.OS === "web") {
      return localStorage.getItem("token");
    }
    return SecureStore.getItemAsync("token");
  };

  const setToken = async (token: string) => {
    if (Platform.OS === "web") {
      localStorage.setItem("token", token);
    } else {
      await SecureStore.setItemAsync("token", token);
    }
  };

  const removeToken = async () => {
    if (Platform.OS === "web") {
      localStorage.removeItem("token");
    } else {
      await SecureStore.deleteItemAsync("token");
    }
  };

  useEffect(() => {
    const checkForToken = async () => {
      const token = await getToken();
      if (token) {
        const { data } = await axios.get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.user);
      }
    };
    checkForToken();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    });

    await setToken(data.token);
    setUser(data.user);
  };

  const logout = async () => {
    await removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
