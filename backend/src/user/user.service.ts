import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Body,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  //注册
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { username, password, avatar } = createUserDto;
    //检查用户名是否存在
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new Error('用户名已存在');
    }
    //生成密码hash
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      avatar,
    });
    return this.userRepository.save(newUser);
  }

  //登录
  async login(@Body() loginUserDto: LoginUserDto): Promise<User> {
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('密码不正确');
    }
    return user;
  }
}
