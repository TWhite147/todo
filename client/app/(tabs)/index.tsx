import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useAuth } from "../(context)/AuthContext";
import * as SecureStore from "expo-secure-store";

const TodoScreen = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<any[]>([]);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get("http://10.0.2.2:3000/todos", {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      });
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!todoText.trim()) return;

    const token = await SecureStore.getItemAsync("token");
    if (!token) return;

    try {
      const { data } = await axios.post(
        "http://10.0.2.2:3000/todos",
        { text: todoText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos([...todos, data]);
      setTodoText("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodoCompletion = async (id: string, completed: boolean) => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) return;

    try {
      const { data } = await axios.put(
        `http://10.0.2.2:3000/todos/${id}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: data.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) return;

    try {
      // Delete the todo
      await axios.delete(`http://10.0.2.2:3000/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleTodoCompletion(item._id, item.completed)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <Text
              style={{
                textDecorationLine: item.completed ? "line-through" : "none",
              }}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => deleteTodo(item._id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
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
    </View>
  );
};

export default TodoScreen;
