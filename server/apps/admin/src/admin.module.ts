import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { ArticleModule } from './logical/article/article.module';
import { ArticleController } from './logical/article/article.controller';


@Module({
  imports: [UserModule, AuthModule, ArticleModule],
  controllers: [AdminController, UserController, ArticleController],
  providers: [AdminService],
})
export class AdminModule { }
