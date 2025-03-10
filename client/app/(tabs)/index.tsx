import { useState, useEffect } from "react";
import { View, TextInput, Button, Text, FlatList } from "react-native";
import axios from "axios";
import { useAuth } from "../(context)/AuthContext";
import * as SecureStore from "expo-secure-store";

const TodoScreen = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<any[]>([]);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get("http://localhost:3000/todos", {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      });
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/todos",
      { text: todoText },
      {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      }
    );
    setTodos([...todos, data]);
    setTodoText("");
  };

  const handleLogout = async () => {
    await logout();
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
        placeholder="New Todo"
        value={todoText}
        onChangeText={setTodoText}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <Button title="Logout" onPress={handleLogout} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{item.text}</Text>
            <Text>{item.completed ? "Completed" : "Pending"}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TodoScreen;
