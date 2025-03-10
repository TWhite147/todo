import { Express, Router } from "express";
import todoRoutes from "./todoRouter";
import authRoutes from "./authRoutes";

const rootRouter = Router();
rootRouter.all("*", (req, res) => {
  res.status(404).send("These are not the routes your are looking for");
});

const setRouting = (app: Express) => {
  app.use("/todos", todoRoutes);
  app.use("/auth", authRoutes);
  app.use(rootRouter);
};

export default setRouting;
