import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../service/categoria.service";
import { CategoriaController } from "../controller/categoria.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [CategoriaService],
    controllers: [CategoriaController],
    exports: [TypeOrmModule]
})
export class CategoriaModule{}