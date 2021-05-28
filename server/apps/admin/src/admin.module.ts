import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';


@Module({
  imports: [UserModule, AuthModule],
controllers: [AdminController, UserController],
  providers: [AdminService],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) //应用LoggerMiddleware中间件
      .forRoutes(UserController); //指定中间件的应用路径/cats/:catName  
  }
}
