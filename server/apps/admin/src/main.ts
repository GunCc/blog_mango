import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { logger } from './middleware/logger.middleware';
import * as express from "express"

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.setGlobalPrefix("admin");
  // 解析数据
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger)
  await app.listen(3000);
}
bootstrap();
