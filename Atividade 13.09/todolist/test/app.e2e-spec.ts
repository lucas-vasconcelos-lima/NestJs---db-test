import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { response } from 'express';

describe('Testes do modulo de produto (e2e)', () => {
  let app: INestApplication;

  let produtoId

  // beforeAll -sempre ter todos os modulos para fazer os testes (criar o teste toda vez antes do banco)
  // beforeEatch - reseta
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [

        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'gen134679',
          database: 'db_farmacia_test',
          // sempre cria automaticamente as entidades do banco
          autoLoadEntities: true,
          synchronize: true,
          // banco nao tera os logs, ou não permite um console.log ou 
          logging: false,
          // drestroi os testes, assim sempre ter testes limpos
          dropSchema: true
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // teste para inserir um produto no banco
  it('01 - Deve inserir um produto no banco', async () => {
    let response = await request(app.getHttpServer())
      .post('/produto')
      .send({
        nome: "Dipirona",
        descricao: "remedio para dor",
        quantidade: 10,
        laboratorio: "Medley",
        foto: "çuasghdusagdsaudgdua"
      })
      // ele espera o retorno de resposta http 201 (item criado)
      .expect(201)

    produtoId = response.body.id
  })

  // teste para veriricar se conseguimos recuperar uma produto em especifico
  it('02 - Deve recuperar uma ptoduto especifica', async () => {
    return request(app.getHttpServer())

      .get(`/produto/${produtoId}`)
      .expect(200)
  })

  // teste para verificar se conseguimos atualizar uma produto
  it('03 - Deve altualizar um produto', async () => {
    return request(app.getHttpServer())
      .put('/produto')
      .send({
        id: 1,
        nome: "Alterada ****** Dipirona",
        descricao: "remedio para dor",
        quantidade: 10,
        laboratorio: "Medley",
        foto: "çuasghdusagdsaudgdua"
      })
      .expect(200)
      .then(response => {
        // toEqual - igual a ...
        expect('Alterada ****** Dipirona').toEqual(response.body.nome)
      })
  })

  //teste para validacao um id que nao existe
  it('04 - Não deve altualizar um produto', async () => {
    return request(app.getHttpServer())
      .put('/produto')
      .send({
        id: 100,
        nome: "Alterada ****** Dipirona",
        descricao: "remedio para dor",
        quantidade: 10,
        laboratorio: "Medley",
        foto: "çuasghdusagdsaudgdua"
      })
      // esperado o erro: bad request
      .expect(404)
  })
  
  // teste para delete
  it('05 - Deve deletar o produto', async () => {
    return request(app.getHttpServer())
      .delete(`/produto/${produtoId}`)
      .expect(204)
  })

  // parar a execução dos testes
  afterAll(async () => {
    await app.close()
  })

});
