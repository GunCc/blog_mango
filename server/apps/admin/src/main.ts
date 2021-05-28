import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { logger } from './middleware/logger.middleware';
import * as express from "express"
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AnyExceptionFilter } from './filter/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);

  // 中间件
  // 解析数据
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger)

  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())

  // 全局过滤器 所有异常要放在所有过滤器顶部
  app.useGlobalFilters(new AnyExceptionFilter()); // 所有异常
  app.useGlobalFilters(new HttpExceptionFilter()); // http异常


  app.setGlobalPrefix("admin");
  await app.listen(3000);
}
bootstrap();
