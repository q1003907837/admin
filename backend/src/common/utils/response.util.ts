import { ResponseDto } from '../dto/response.dto';

export const successResponse = <T>(data: T, message = 'Request successful') =>
  new ResponseDto(0, true, 200, message, data);

export const errorResponse = (status: number, message: string) =>
  new ResponseDto(1, false, status, message);
