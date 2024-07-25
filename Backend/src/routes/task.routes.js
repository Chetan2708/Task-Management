import express from "express";
import { createTask, deleteTask, getTasks, updateTask, updateTaskColumn } from "../controllers/task.controller.js";

const router = express.Router();



router.post('/create-task', createTask);
router.get('/get-tasks', getTasks);
router.put('/update-task/:id', updateTask);
router.delete('/delete-task/:id', deleteTask);
router.put('/update-task-column/:id', updateTaskColumn);


export default router