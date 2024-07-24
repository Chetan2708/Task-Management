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
    const { title, description, status } = req.body;``
    const newTask = new Task({ title, description, status });
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




export { createTask }