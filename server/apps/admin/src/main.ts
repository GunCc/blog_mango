import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.setGlobalPrefix("admin");
  await app.listen(3000);
}
bootstrap();
