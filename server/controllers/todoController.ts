import { Request, Response } from "express";
import { Todo } from "../models/Todo";

interface CustomRequest extends Request {
  userId?: string;
}

export const createTodo = async (req: CustomRequest, res: Response) => {
  try {
    const { text } = req.body;
    const newTodo = new Todo({ userId: req.userId, text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTodos = async (req: CustomRequest, res: Response) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
