import cors from "cors";
import morgan from "morgan";
import express from "express";
import connectDataBase from "./database";
import { generalError, notFoundError } from "./server/middlewares/error";
import "./dotenv";
import robotsRouter from "./server/router/robotsRouter";
import { startServer, app } from "./server/startServer";
import loginRouter from "./server/router/loginRouter";

const PORT = process.env.PORT ?? 4050;
const mongoUrl = process.env.MONGOURL;

(async () => {
  try {
    await connectDataBase(mongoUrl);
    await startServer(+PORT);
  } catch {
    process.exit(1);
  }
})();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/users", loginRouter);
app.use("/robots", robotsRouter);
app.use(generalError);
app.use(notFoundError);
