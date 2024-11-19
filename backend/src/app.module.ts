import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '47.100.24.148',
      port: 3306,
      username: 'root',
      password: 'zx123.zx',
      database: 'keadmin',
      entities: [User],
      //自动同步数据库结构到数据库中，开发阶段使用，生产环境中建议关闭。
      synchronize: process.env.NODE_ENV === 'development', // 不要在生产环境中使用同步
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
