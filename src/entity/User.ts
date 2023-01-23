import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm"
import { Articles } from "./articles"
import { Commentary } from "./commentary"

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    password: string

    @Column({default: false})
    admin: boolean


    @OneToMany(() => Articles, (article) => article.user)
    articles: Articles[]


    @OneToMany(() => Commentary, (commentary) => commentary.user)
    commentary: Commentary[]
}
