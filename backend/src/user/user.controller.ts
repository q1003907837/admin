import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { successResponse, errorResponse } from '../common/utils/response.util';
import { HttpStatusCodes } from '../common/constants/http-status-codes';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('register')
  @HttpCode(HttpStatusCodes.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.register(createUserDto);
      return successResponse(user, '用户创建成功');
    } catch (error) {
      // 处理错误情况，并返回自定义的错误响应
      return errorResponse(
        HttpStatusCodes.BAD_REQUEST,
        error.message || '用户创建失败',
      );
    }
  }
  @Post('login')
  @HttpCode(HttpStatusCodes.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.login(loginUserDto);
      const access_token = await this.authService.login(user);
      const roles = [];
      const menuList = [];
      delete user.password;
      return successResponse(
        { ...user, ...access_token, ...roles, menuList },
        '登录成功',
      );
    } catch (error) {
      console.log(error);
      // 处理错误情况，并返回自定义的错误响应
      return errorResponse(
        HttpStatusCodes.BAD_REQUEST,
        error.message || '登录失败',
      );
    }
  }
}
