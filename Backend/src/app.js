import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import passport from "./utils/passport.js";
import * as dotenv from 'dotenv'
dotenv.config()
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173")
  next()
})

const allowedOrigins = [
  "http://localhost:5173",

];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookies", "Cookie"],
  exposedHeaders: ["Set-Cookie"],
};

app.use(cors(corsOptions));
console.log(process.env.CORS_ORIGIN)
app.use(cookieParser());
passport(app)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too Many Requests!",
});

app.use(express.json({ limit: "16kb" })); 

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

// Routes Import
import  authRoutes from "./routes/auth.routes.js"
import taskRouter from "./routes/task.routes.js";

// Routes Use
app.use("/api/v1/task", taskRouter);
app.use("/auth", authRoutes);

export { app };
