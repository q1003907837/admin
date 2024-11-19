export class ResponseDto<T> {
  code: number;
  success: boolean;
  status: number;
  message: string;
  data?: T;

  constructor(
    code: number,
    success: boolean,
    status: number,
    message: string,
    data?: T,
  ) {
    this.code = code;
    this.success = success;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
