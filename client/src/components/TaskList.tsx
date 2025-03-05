import { useEffect } from "react";
import { FlatList, Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getTasks, deleteTask, updateTask } from "../api";
import {
  addTask,
  removeTask,
  updateTask as updateTaskAction,
} from "../store/tasksSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    getTasks().then((data) => data.forEach((task) => dispatch(addTask(task))));
  }, [dispatch]);

  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <View>
          <Text>{item.title}</Text>
          <Button
            title="Complete"
            onPress={() => {
              updateTask(item.id, !item.completed);
              dispatch(
                updateTaskAction({ ...item, completed: !item.completed })
              );
            }}
          />
          <Button
            title="Delete"
            onPress={() => {
              deleteTask(item.id);
              dispatch(removeTask(item.id));
            }}
          />
        </View>
      )}
    />
  );
};

export default TaskList;
