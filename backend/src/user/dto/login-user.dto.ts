import { IsNotEmpty, IsString, IsUrl, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  @MinLength(6, { message: '密码长度至少为6个字符' })
  password: string;
}
