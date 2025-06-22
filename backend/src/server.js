import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT= process.env.PORT || 5001;

connectDB();

app.use("/api/notes", notesRoutes);

//Endpoint - an endpoint is a url that is used to access the server, lets client interact with a specific resource on the server

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
