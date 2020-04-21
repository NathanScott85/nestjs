import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggetOptions = new DocumentBuilder()
    .setTitle('Swagger API')
    .setDescription('Product Api built with NextJS')
    .setVersion('0.1')
    .build();
   //can add .addApiKey() to later allow the generation of an API key later.

  const document = SwaggerModule.createDocument(app, swaggetOptions);
  SwaggerModule.setup('/', app, document);

  app.enableCors();
  
  await app.listen(process.env.port || 4000);
}
bootstrap();
