
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      statusMessage: error.name,
      errorMessage: error.message,
      errors: error.errors,

    });
  }
};

export { asyncHandler };
