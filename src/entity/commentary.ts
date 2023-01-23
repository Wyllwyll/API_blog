import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm"
import { Articles } from "./articles"
import { User } from "./User"


@Entity()

export class Commentary extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    title: string

    @Column({ nullable: false })
    content: string

    @Column({ type: "timestamp", default: "NOW()", nullable: false })
    created_date: Date

    @Column({ type: "timestamp", default: "NOW()", nullable: false })
    uptdate: Date

    @ManyToOne(() => User, (user) => user.commentary)
    user: User

    @ManyToOne(() => Articles, (articles) => articles.commentary)
    articles: Articles

}