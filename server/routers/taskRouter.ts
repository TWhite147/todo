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
taskRouter.put("/:id", editTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
