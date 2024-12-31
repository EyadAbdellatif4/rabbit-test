import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  await app.listen(8080);
}

bootstrap();

//// Error Handling: Ensure comprehensive error handling across all services and controllers.
//// Security: Implement authentication and authorization for sensitive operations.
//// Testing: Add unit and integration tests to ensure reliability.
//// Scalability: Consider using a distributed cache like Redis for better scalability.
