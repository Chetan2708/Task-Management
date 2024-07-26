import { Router } from "express";
import passport from "passport";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";

const router = Router();

// Authenticate the user using Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
  })
);
router.get("/check", async(req,res)=>{
  res.send("hello")
}
)

// Forward the request to Google's authentication server
router.get("/google", passport.authenticate("google"));

// Register or login user to DB
router.get("/login/success", async (req, res) => {
  if (req.user) {
    const userExists = await User.findOne({ email: req.user.email });
    let userId;
    if (userExists) {
      generateToken(res, userExists._id);
      userId = userExists._id;
    } else {
      const newUser = new User({
        email: req.user.email,
        password: Date.now().toString(), // Use a string password for mongoose schema compatibility
      });
      await newUser.save();
      generateToken(res, newUser._id);
      userId = newUser._id;
    }
    res.status(200).json({
      user: { ...req.user },
      message: "Successfully logged in",
      _id: userId,
    });
  } else {
    res.status(403).json({
      message: "Not Authorized",
    });
  }
});

// Login failed
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    message: "Login Failed",
  });
});

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

export default router;
