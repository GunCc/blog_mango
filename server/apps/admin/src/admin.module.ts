import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';


@Module({
  imports: [UserModule, AuthModule],
  controllers: [AdminController, UserController],
  providers: [AdminService],
})
export class AdminModule {}
