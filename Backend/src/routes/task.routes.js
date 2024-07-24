import express from "express";
import { createTask } from "../controllers/task.controller.js";

const router = express.Router();



// Create a new task
router.post('/create-task', createTask);


export default router