class ApiError extends Error {
    constructor(
        statusCode,
        name,
        message= "Something went wrong",
        errors=[],
        
    )
    {
        super(message)
        this.statusCode = statusCode
        this.name = name
        this.errors = errors
    }
}

export {ApiError}