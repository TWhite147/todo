import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post("http://10.0.2.2:3000/auth/register", {
        // const response = await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
      });

      if (response.status === 201) {
        dispatch(login(response.data.token));
        navigation.navigate("Todos");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error signing up");
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
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;
