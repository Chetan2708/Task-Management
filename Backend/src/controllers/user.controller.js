import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {
  StatusCode,
  StatusMessages,
  ResponseMessages,
} from "../constants/messages.constants.js";
import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const generateAccessToken = async (userId) => {
    try {
      const user = await userModel.findById(userId);
      const accessToken = user.generateAccessToken(); 
    
      return {
        accessToken,
      };
    } catch (error) {
      throw new ApiError(
        StatusCode.INTERNAL_ERROR,
        StatusMessages.INTERNAL_ERROR,
        ResponseMessages.INTERNAL_ERROR,
        { message: "An error occurred while generating access token" }
      );
    }
  };



const registerUser = asyncHandler(async (req, res, next) => {

  const { name, email, password } = req.body;
  
  
  if ([email, name, password].some((field) => field?.trim() === "")) {
    throw new ApiError(
      StatusCode.UNPROCESSABLE_ENTITY,
      StatusMessages.UNPROCESSABLE_ENTITY,
      ResponseMessages.UNPROCESSABLE_ENTITY,
      { message: "All fields are required" }
    );
  }
  const existingUser = await userModel.findOne({ email });
  
  if (existingUser) {
    throw new ApiError(StatusCode.CONFLICT_ERROR ,
       StatusMessages.CONFLICT_ERROR , ResponseMessages.CONFLICT_ERROR , {message:"User with the given email already exists"});
   
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const createdUser = await userModel.findById(user._id).select(
    "-password"
  );  

  if (!createdUser) {
    throw new ApiError(StatusCode.NOT_FOUND , StatusMessages.NOT_FOUND , ResponseMessages.NOT_FOUND , { message: "Something went wrong while adding user"});
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});





const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(
      StatusCode.UNPROCESSABLE_ENTITY,
      StatusMessages.UNPROCESSABLE_ENTITY,
      ResponseMessages.UNPROCESSABLE_ENTITY,
      { message: "Email and password are required" }
    );
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    throw new ApiError(
      StatusCode.NOT_FOUND,
      StatusMessages.NOT_FOUND,
      ResponseMessages.NOT_FOUND,
      { message: "User not found" }

    );
  }
  // Check if password is correct
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(
      StatusCode.INCORRECT_PASSWORD,
      StatusMessages.INCORRECT_PASSWORD,
      ResponseMessages.INCORRECT_PASSWORD,
      { message: "Invalid password" }
    );
  }
   // Return token
   generateToken(res ,user._id);

   const loggedInUser = await userModel.findById(user._id).select(
     "-password"
   );

   return res
     .status(200)
     .json(
       new ApiResponse(
         200,
         {
           user: loggedInUser,
         },
         "User logged in successfully"
       )
     );
 });

// const logoutUser = asyncHandler(async (req, res) => {
//   await User.findByIdAndUpdate(
//     req.user._id,
//     {
//       $unset: {
//         refreshToken: 1, // this removes the field from document
//       },
//     },
//     {
//       new: true,
//     }
//   );

//   const options = {
//     httpOnly: true,
//     secure: true,
//     sameSite:'none'
//   };

//   return res
//     .status(200)
//     .clearCookie("accessToken", options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200, {}, "User logged Out"));
// });

// const refreshAccess = asyncHandler(async (req, res) => {
//   const incomingRefreshToken =
//     req.cookies.refreshToken || req.body.refreshToken;

//   if (!incomingRefreshToken) {
//     throw new ApiError(
//       StatusCode.UNAUTHORIZED,
//       StatusMessages.UNAUTHORIZED,
//       ResponseMessages.UNAUTHORIZED,
//       { message: "Refresh token is required" }
//     );
//   }

//   try {
//     const decodedToken = jwt.verify(
//       incomingRefreshToken,
//       process.env.REFRESH_TOKEN_SECRET
//     );

//     const user = await User.findById(decodedToken._id);
//     if (!user) {
//       throw new ApiError(
//         StatusCode.UNAUTHORIZED,
//         StatusMessages.UNAUTHORIZED,
//         ResponseMessages.UNAUTHORIZED,
//         { message: "Invalid refresh token" }
//       );
//     }
//     if (user?.refreshToken !== incomingRefreshToken) {
//       throw new ApiError(
//         StatusCode.UNAUTHORIZED,
//         StatusMessages.UNAUTHORIZED,
//         ResponseMessages.UNAUTHORIZED,
//         { message: "Invalid refresh token" }
//       );
//     }

//     const options = {
//       httpOnly: true,
//       secure: true,
//     sameSite:'none'

//     };

//     const { accessToken, newRefreshToken } = await user.generateAccessToken(
//       user._id
//     );

//     return res
//       .status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", newRefreshToken, options)
//       .json(
//         new ApiResponse(
//           200,
//           { accessToken, refreshToken: newRefreshToken },
//           "Access token refreshed successfully"
//         )
//       );
//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid refresh token!");
//   }
// });

// const changeCurrentPassword = asyncHandler(async (req, res) => {
//   const { currentPassword, newPassword } = req.body;
//   const user = await User.findById(req.user?._id);
//   if (!user) {
//     throw new ApiError(
//       StatusCode.NOT_FOUND,
//       StatusMessages.NOT_FOUND,
//       ResponseMessages.NOT_FOUND,
//       { message: "User not found" }
//     );
//   }
//   const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);
//   if (!isPasswordCorrect) {
//     throw new ApiError(
//       StatusCode.INCORRECT_PASSWORD,
//       StatusMessages.INCORRECT_PASSWORD,
//       ResponseMessages.INCORRECT_PASSWORD,
//       { message: "Invalid password" }

//     );
//   }
//   user.password = newPassword;
//   await user.save({ validateBeforeSave: false });
//   return res
//     .status(200)
//     .json(new ApiResponse(200, {}, "Password changed successfully"));
// });

// const updateAccountDetails = asyncHandler(async (req, res) => {
//   const { name, email } = req.body;

//   const user = await User.findByIdAndUpdate(
//     req.user._id,
//     {
//       $set: {
//         name,
//         email,
//       },
//     },
//     { new: true }
//   ).select("-password");

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(200, { user }, "Account details updated successfully")
//     );
// });

// const getCurrentUser = asyncHandler(async (req, res) => {
//   return res
//     .status(200)
//     .json(new ApiResponse(200, { user: req.user }, "User found successfully"));
// });





export {
  registerUser,
  loginUser,
//   logoutUser,
//   refreshAccess,
//   changeCurrentPassword,
//   updateAccountDetails,
//   getCurrentUser,

};
