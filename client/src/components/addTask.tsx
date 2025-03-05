import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { addTask } from "../store/tasksSlice";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask(title));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
