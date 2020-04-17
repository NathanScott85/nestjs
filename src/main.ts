import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().setTitle('Hello world')
    .setDescription('A Basic Hello World')
    .setVersion('0.1')
    .addTag('Hello')
    .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

  await app.listen( process.env.port || 4000);
}
bootstrap();
