class ApiError extends Error {
  constructor(statusCode, message,error=[],stack="") {
    super(message);
    this.statusCode = statusCode;
    this.success=false;
    this.data=null;
    this.error=error;
    this.stack=stack;
    if(stack){
      this.stack=stack;
    }else{
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export {ApiError};