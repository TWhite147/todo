import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import AddTask from "./components/addTask";

function App() {
  return (
    <Router>
      <div>
        <h1>To-Do App</h1>
        <AddTask />
        <Routes>
          <Route path="/" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
