import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {
  StatusCode,
  StatusMessages,
  ResponseMessages,
} from "../constants/messages.constants.js";
import Task from "../models/task.model.js"

const createTask = asyncHandler(async(req,res)=>{
    const { title, description, column } = req.body;``
    const newTask = new Task({ title, description, column });
    await newTask.save();
    if (!newTask) {
        throw new ApiError(
            StatusCode.NOT_FOUND,
            StatusMessages.NOT_FOUND,
            ResponseMessages.NOT_FOUND,
            { message: "Something went wrong while adding user"}
        );
    }

    return res 
        .status(201)
        .json(new ApiResponse(201, {}, createTask));
})


const getTasks = asyncHandler(async(req,res)=>{
    const tasks = await Task.find();
    if (!tasks) {
        throw new ApiError(
            StatusCode.NOT_FOUND,
            StatusMessages.NOT_FOUND,
            ResponseMessages.NOT_FOUND,
            { message: "No Tasks Found!"}
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
})

const updateTask = asyncHandler(async(req,res)=>{
    const { title, description } = req.body;
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
        throw new ApiError(
            StatusCode.NOT_FOUND,
            StatusMessages.NOT_FOUND,
            ResponseMessages.NOT_FOUND,
            { message: "Something went wrong while updating task"}
        );
    }
    task.title = title;
    task.description = description;
    await task.save();
    return res
        .status(200)
        .json(new ApiResponse(200, task, "Task updated successfully"));
})

const deleteTask = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
        throw new ApiError(
            StatusCode.NOT_FOUND,
            StatusMessages.NOT_FOUND,
            ResponseMessages.NOT_FOUND,
            { message: "Something went wrong while deleting task"}
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, task, "Task deleted successfully"));
})

const updateTaskColumn = asyncHandler(async (req, res) => {
    const { column } = req.body;
    const { id } = req.params;
  
    
    const validColumns = ['todo', 'inProgress', 'done'];
    if (!validColumns.includes(column)) {
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        StatusMessages.BAD_REQUEST,
        ResponseMessages.INVALID_COLUMN,
        { message: "Invalid column value provided" }
      );
    }
  
    const task = await Task.findById(id);
    if (!task) {
      throw new ApiError(
        StatusCode.NOT_FOUND,
        StatusMessages.NOT_FOUND,
        ResponseMessages.NOT_FOUND,
        { message: "Task not found" }
      );
    }
  
    task.column = column;
    await task.save();
  
    return res
      .status(200)
      .json(new ApiResponse(200, task, "Task column updated successfully"));
  });
  


export { createTask ,getTasks , updateTask , deleteTask ,updateTaskColumn}