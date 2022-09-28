import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/modules/categoria.modules';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/modules/produto.module';

@Module({

  imports: [
    /*
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'gen134679',
      database: 'db_farmacia',
      entities: [Produto, Categoria],
      synchronize: true
    }),
    */

    TypeOrmModule.forRoot({

      // teste de alteração 
      type: 'postgres',
      //(variavel de ambiente) falando que o processo que esta rodando ira buscar a variavel que contem o banco de dados
      url: process.env.DATABASE_URL,  
      logging: false,
      // apos rodar o programa nenhum dado será perdido
      dropSchema: false,
      // não precisa ter uma certificação digital para subir para o banco
      ssl: {
      rejectUnauthorized: false
    },
      // pega todo escopo do projeto e identifica as entidades automaticamente
      autoLoadEntities: true,
      synchronize: true

      /*
      pontos de atenção:
      quando clonar utilizar o banco local para fazer testes e alterações, assim comentando o banco de cloud.
      se tudo ok comenta o local, descomenta o cloud e manda o projeto já testado.
      */
 
      
    }),
  ProdutoModule,
  CategoriaModule
  ],
// ele precisa estar aqui para fazer o redirecionamento 
controllers: [AppController],
  providers: [],
})
export class AppModule { }
