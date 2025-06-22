import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

connectDB();

app.get("/", (req, res) => {
  res.send("Server is alive!");
});

app.use("/api/notes", notesRoutes);

//Endpoint - an endpoint is a url that is used to access the server, lets client interact with a specific resource on the server

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started at port ${PORT}`);
});
