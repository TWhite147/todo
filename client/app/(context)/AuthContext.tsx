import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { login, logout } from "@/store/authSlice";

interface AuthContextType {
  user: any;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        dispatch(login(token));
      }
    };
    checkAuth();
  }, [dispatch]);

  const loginUser = (token: string) => {
    dispatch(login(token));
  };

  const logoutUser = () => {
    dispatch(logout());
    SecureStore.deleteItemAsync("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, login: loginUser, logout: logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
