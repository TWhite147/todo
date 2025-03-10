import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useAppDispatch } from "../../store/store";
import { addTask } from "../../store/taskSlice";

const AddTaskScreen = () => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    if (!title.trim()) return;
    dispatch(addTask(title));
    setTitle("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task..."
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, padding: 10, marginBottom: 10, fontSize: 18 },
});

export default AddTaskScreen;
