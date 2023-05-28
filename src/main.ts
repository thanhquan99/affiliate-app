import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import CONFIG = require('config');
import { knex } from './db/entities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = CONFIG.get('server');
  const config = new DocumentBuilder()
    .setTitle('Affiliate App API')
    .setVersion('1.0')
    .addTag('Affiliate App')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(process.env.PORT || serverConfig.port);
}
bootstrap();
