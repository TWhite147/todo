import { Express, Router } from "express";
import taskRouter from "./todoRouter";
import authRoutes from "./authRoutes";

const rootRouter = Router();
rootRouter.all("*", (req, res) => {
  res.status(404).send("These are not the routes your are looking for");
});

const setRouting = (app: Express) => {
  app.use("/tasks", taskRouter);
  app.use("/auth", authRoutes);
  app.use(rootRouter);
};

export default setRouting;
