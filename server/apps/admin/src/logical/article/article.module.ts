import { Module } from '@nestjs/common';
import { DbService } from '@app/db';
import { ArticleService } from './article.service';

@Module({
  providers: [ArticleService, DbService],
  exports: [ArticleService]
})
export class ArticleModule { }
