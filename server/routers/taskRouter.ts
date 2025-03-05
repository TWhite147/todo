import Router from "express";
import {
  deleteTask,
  editTask,
  getTasks,
  postTasks,
} from "../controllers/taskController";

const taskRouter = Router();

taskRouter.get("/", getTasks);
taskRouter.post("/", postTasks);
taskRouter.put("/", editTask);
taskRouter.delete("/", deleteTask);

export default taskRouter;
