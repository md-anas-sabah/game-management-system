import { specs, swaggerUi } from "./utils/swagger";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db";
import gameRoutes from "./routes/gameRoutes";

dotenv.config();

connectDB();

const app: Application = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use("/api/games", gameRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Game Management API is running...");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
