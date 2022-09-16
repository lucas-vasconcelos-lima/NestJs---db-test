import { IsNotEmpty, MaxLength } from "class-validator";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'tb_produto' })
export class Produto {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    @ApiProperty()
    nome: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    @ApiProperty()
    descricao: string

    @IsNotEmpty()
    @Column({ nullable: false})
    @ApiProperty()
    quantidade: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    @ApiProperty()
    laboratorio: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    @ApiProperty()
    foto: string
    
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {

        onDelete: "CASCADE"
    })
    // precisa colocar o tipo da relação ou melhor, com quem 
    @ApiProperty({type: () => Categoria})
       categoria: Categoria
       

}