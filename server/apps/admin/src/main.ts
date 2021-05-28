import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { logger,LoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.setGlobalPrefix("admin");
  app.use(LoggerMiddleware)
  await app.listen(3000);
}
bootstrap();
