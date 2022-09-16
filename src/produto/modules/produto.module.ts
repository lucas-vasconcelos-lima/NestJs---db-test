import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ProdutoService } from "../service/produto.service";
import { ProdutoController } from "../controller/produto.controller";
import { Produto } from "../entities/produto.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Produto])],
    providers: [ProdutoService],
    controllers: [ProdutoController],
    exports: [TypeOrmModule]
})
export class ProdutoModule{}

