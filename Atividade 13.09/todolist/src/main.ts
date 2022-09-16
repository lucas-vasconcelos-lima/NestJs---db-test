import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  // parametros para documentação e configurar toda pg inicial do swagger
  const config = new DocumentBuilder()
    // titulo do set
    .setTitle('To-do List')
    // descrição do set
    .setDescription('Projeto farmacia')
    // contatods que ficaram disponiveis
    .setContact('Lucas V',
      'url do desenvolvedor - literalmente o contato',
      'email@email'
    )
    // versao da api
    .setVersion('1.0')
    // controi toda documentação 
    .build()

  // constroi a documentação e coloca no app
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)



  process.env.TZ = '-03:00'
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
