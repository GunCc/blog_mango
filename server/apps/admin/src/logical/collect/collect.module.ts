import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { DbService } from './../../../../../libs/db/src/db.service';

@Module({
  providers: [CollectService,DbService],
  exports:[CollectService]
})
export class CollectModule {}
