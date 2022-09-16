import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() {}

  // apagar os inuteis

  // quando bater no end point
  @ApiExcludeEndpoint()
  // vai chamar um get e 
  @Get()
  async redirect (@Res() resposta: any){
    // redirecionar para a pg que queremos
    return resposta.redirect('/swagger')
  }

 
}
