import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { noteRoutes } from "./routes/note.routes";

const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/testdatabase";

mongoose.connect(uri);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.use(cors());
app.use(express.json());
app.use("/api/note", noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
