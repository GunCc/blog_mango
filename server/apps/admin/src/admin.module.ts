import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { ArticleModule } from './logical/article/article.module';
import { ArticleController } from './logical/article/article.controller';
import { ArticleTypeController } from './logical/article-type/article-type.controller';
import { ArticleTypeModule } from './logical/article-type/article-type.module';
import { CollectController } from './logical/collect/collect.controller';
import { CollectModule } from './logical/collect/collect.module';


@Module({
  imports: [UserModule, AuthModule, ArticleModule, ArticleTypeModule, CollectModule],
  controllers: [AdminController, UserController, ArticleController, ArticleTypeController, CollectController],
  providers: [AdminService],
})
export class AdminModule { }
