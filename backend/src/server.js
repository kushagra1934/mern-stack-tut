import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import passport from "passport";

import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import "./config/passport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // The URL of your frontend application
    credentials: true, // This allows the browser to send cookies and authorization headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);


app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//custom middleware
// app.use((req,res,next)=>{
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
//   next();
// })

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});

//done
