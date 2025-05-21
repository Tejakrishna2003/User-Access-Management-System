import express from "express";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import softwareRoutes from "./routes/software";
import requestRoutes from "./routes/requests";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/software", softwareRoutes);
app.use("/api/requests", requestRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Error connecting to database:", error));