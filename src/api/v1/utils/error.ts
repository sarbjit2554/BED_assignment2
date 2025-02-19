export class ValidationError extends Error {
    public statusCode: number;
    constructor(message: string) {
      super(message);
      this.statusCode = 400;  // Bad Request
    }
  }
  
  export class NotFoundError extends Error {
    public statusCode: number;
    constructor(message: string) {
      super(message);
      this.statusCode = 404;  // Not Found
    }
  }
  
  export class InternalServerError extends Error {
    public statusCode: number;
    constructor(message = 'Internal Server Error') {
      super(message);
      this.statusCode = 500;  // Internal Server Error
    }
  }
  