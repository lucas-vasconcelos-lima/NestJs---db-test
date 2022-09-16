import { IsNotEmpty, MaxLength } from "class-validator";
import { Produto } from "../../produto/entities/produto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";

@Entity('tb_categoria')
export class Categoria{

    @PrimaryGeneratedColumn()
    // permite a "aparição" dela na busca 
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    @ApiProperty()
    nome: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    @ApiProperty()
    descricao: string

    @OneToMany(() => Produto, (produto) => produto.categoria)
    // colocar a relação da outra tabela para não ficar em loop infinito
    @ApiProperty({type: () => Produto} )
    produto: Produto[]
    
}