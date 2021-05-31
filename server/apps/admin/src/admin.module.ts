import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { ArticleService } from './logical/article/article.service';
import { ArticleModule } from './logical/article/article.module';


@Module({
  imports: [UserModule, AuthModule, ArticleModule],
  controllers: [AdminController, UserController],
  providers: [AdminService, ArticleService],
})
export class AdminModule {}
