import StatusCodes from 'http-status-codes';

export class HttpRequestError extends Error {
  constructor(
    public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    public message: string
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}
