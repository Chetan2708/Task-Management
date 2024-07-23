export const StatusCode = {
  SUCCESS: 200,
  INCORRECT_PASSWORD: 401,
  VALIDATION_ERROR: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  CONFLICT_ERROR: 409,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY:422
};

export const StatusMessages = {
  LOGIN_SUCCESS: "Loged-In",
  SUCCESS: "Successful",
  INCORRECT_PASSWORD: "Incorrect Password!",
  VALIDATION_ERROR: "Validation Failed, Try again!",
  NOT_FOUND: "Not found!",
  INTERNAL_ERROR: "Something went wrong!",
  CONFLICT_ERROR: "Conflict",
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized Access",
  FORBIDDEN: "Forbidden",
  UNPROCESSABLE_ENTITY:"Invalid Details"
};

export const ResponseMessages = {
  LOGIN_SUCCESS: "Loged-In successfully.",
  INCORRECT_PASSWORD:
    "Incorrect password, please try again later with different password!",
  VALIDATION_ERROR:
    "Validation Failed, Please check your request and try again by using other credentials!",
  NOT_FOUND: "Not found, Please try again with different credentials!",
  INTERNAL_ERROR:
    "Something is wrong at server side, Please try again after some time!",
  CONFLICT_ERROR:
    "User already exist, Please try again with different credentials!",
  BAD_REQUEST: "Bad request, please check your input and try again.",
  UNAUTHORIZED: "Unauthorized access, please log in and try again.",
  FORBIDDEN:
    "Forbidden action, you do not have permission to perform this action.",
  UNPROCESSABLE_ENTITY:"Required details are missing or invalid, please check your input and try again."
};
