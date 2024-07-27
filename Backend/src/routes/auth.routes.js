import { Router } from "express";

import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();


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
        name: req.user.displayName,
        email: req.user.email,
        pic: req.user.photos[0].value,
        password: Math.random().toString(36).slice(-8),
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
      return res.status(500).json({ message: "Logout Failed" });
    }
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Logout Failed" });
      }
      res.clearCookie("connect.sid", { path: "/" });
      res.clearCookie("accessToken"); 
      res.status(200).json({ message: "Successfully logged out" });
    });
  });
});


router.post("/user/register", registerUser)
router.post("/user/login", loginUser)

export default router;
