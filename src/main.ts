import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    // App
    const app = await NestFactory.create(AppModule);
    
    // CORS
    app.enableCors({ origin: '*', credentials: true });
    
    // Validation
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          const result = errors.map((error) => ({
            property: error.property,
            message: error.constraints[Object.keys(error.constraints)[0]],
          }));
          return new HttpException(result, HttpStatus.BAD_REQUEST);
        },
        stopAtFirstError: true,
      }),
    );

    // Global prefix
    app.setGlobalPrefix('api');

    // Swagger
    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('EDU-erp')
      .setDescription('Program for automation of educational centers.')
      .addTag('NodeJs NestJs Postgresql, Prisma JWT Swagger')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

    // Listening
    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error, 'path: main.ts');
  }
};
start();
