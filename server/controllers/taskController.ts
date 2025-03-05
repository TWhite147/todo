import TaskModel from "../models/Task";
import { Request, Response } from "express";

export async function getTasks(req: Request, res: Response) {
  try {
    const tasks = await TaskModel.find();
    if (tasks) res.send(tasks);
    else res.status(404).send("No tasks found");
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function postTasks(req: Request, res: Response) {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
}

export async function editTask(req: Request, res: Response) {
  try {
    const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) res.status(404).send("Task not found");
    res.send(task);
  } catch (error) {
    res.status(400).send("Bad request");
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    if (!task) res.status(404).send("Task not found");
    res.status(204).send(task);
  } catch (error) {
    res.status(400).send("Bad request");
  }
}
