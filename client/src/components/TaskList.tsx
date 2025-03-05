import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { fetchTasks, deleteTask, updateTask } from "../store/tasksSlice";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ listStyle: "none" }}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() =>
                dispatch(updateTask({ ...task, completed: !task.completed }))
              }
            >
              {task.title}
            </span>
            <button onClick={() => dispatch(deleteTask(task._id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
