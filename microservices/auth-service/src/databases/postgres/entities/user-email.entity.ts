import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { UserEntity } from "./user.entity";

@Entity({ name: "users_emails" })
export class UserEmailEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text", { unique: true })
    email: string;

    @Column("boolean")
    confirm: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.emails, { onDelete: "CASCADE" })
    user: UserEntity;
}
