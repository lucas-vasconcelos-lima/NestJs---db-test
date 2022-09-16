import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../service/produto.service";

@ApiTags('Produto')
@Controller('/produto')
export class ProdutoController{
    constructor(private readonly service: ProdutoService){}


    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise <Produto[]>{
        return this.service.findAll()
    }
    
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.service.findByid(id)
    }

    @Get('/busca/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Produto[]>{
        return this.service.findByNome(nome)
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto>{
        return this.service.create(produto)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto>{
        return this.service.update(produto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.service.delete(id)
    }

}