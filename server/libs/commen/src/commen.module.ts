import { Module } from '@nestjs/common';
import { CommenService } from './commen.service';

@Module({
  providers: [CommenService],
  exports: [CommenService],
})
export class CommenModule {}
