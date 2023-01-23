import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm"
import { Commentary } from "./commentary"
import { User } from "./User"

@Entity()

export class Articles extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number


    @Column({ nullable: false })
    title: string


    @Column({ nullable: false })
    content: string


    @Column({ type: "timestamp", default: "NOW()", nullable: false })
    date_crea: Date


    @Column({ type: "timestamp", default: "NOW()", nullable: false })
    date_upt: Date


    @ManyToOne(() => User, (user) => user.articles)
    user: User


    @OneToMany(() => Commentary, (commentary) => commentary.articles)
    commentary: Commentary[]


}