import express from "express";
import cors from "cors";
import pizzaRouter from "./routes/api/pizza.js";
import dotenv from "dotenv";
import authRouter from "./routes/api/auth.js";


dotenv.config()

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/pizza", pizzaRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err
  res.status(status).json(message)
})

export default app;

