import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);

    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('EDU-erp')
      .setDescription('Program for automation of educational centers.')
      .addTag('NodeJs NestJs Postgresql, Prisma JWT Swagger')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error, 'path: main.ts');
  }
};
start();
