import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Google OAuth routes
router.get(
  "/google",
  (req, res, next) => {
    console.log("Initiating Google OAuth...");
    console.log("Client ID:", process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set");
    console.log(
      "Client Secret:",
      process.env.GOOGLE_CLIENT_SECRET ? "Set" : "Not set"
    );
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect:"/login" }),
  (req, res) => {
    try {
      console.log("OAuth callback successful, user:", req.user);

      // Generate JWT token
      const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log("JWT token generated, redirecting to frontend");

      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    } catch (error) {
      console.error("Error in OAuth callback:", error);
      res.status(500).json({ message: "Authentication failed" });
    }
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error during logout" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

// Get current user
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-googleId");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
