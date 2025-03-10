import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { fetchTasks, deleteTask, updateTask } from "../../store/taskSlice";
import { useEffect } from "react";

export default function TaskListScreen() {
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task._id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              onPress={() =>
                dispatch(updateTask({ ...item, completed: !item.completed }))
              }
            >
              <Text
                style={item.completed ? styles.completedText : styles.taskText}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(deleteTask(item._id))}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  taskText: { fontSize: 18 },
  completedText: { fontSize: 18, textDecorationLine: "line-through" },
  deleteButton: { color: "red", fontSize: 18 },
});
