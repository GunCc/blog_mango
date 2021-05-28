import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { logger } from './middleware/logger.middleware';
import * as express from "express"
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);

  // 中间件
  // 解析数据
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger)

  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())


  app.setGlobalPrefix("admin");
  await app.listen(3000);
}
bootstrap();
