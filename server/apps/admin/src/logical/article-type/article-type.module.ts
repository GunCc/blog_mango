import { Module } from '@nestjs/common';
import { ArticleTypeService } from './article-type.service';
import { DbService } from './../../../../../libs/db/src/db.service';

@Module({
  providers: [ArticleTypeService,DbService],
  exports:[ArticleTypeService]
})
export class ArticleTypeModule {}
