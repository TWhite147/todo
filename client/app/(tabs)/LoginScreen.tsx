import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post("http://10.0.2.2:3000/auth/login", {
        // const response = await axios.post("http://localhost:3000/auth/login", { FOR USE IF TESTING IN BROWSER
        email,
        password,
      });

      if (response.status === 200) {
        await SecureStore.setItemAsync("token", response.data.token);
        dispatch(login(response.data.token));
        navigation.navigate("Todos");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}
      <Button title="Log In" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={{ color: "blue", marginTop: 10 }}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
