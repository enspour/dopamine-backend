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
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;

    @ManyToOne(() => UserEntity, (user) => user.emails, { onDelete: "CASCADE" })
    user: UserEntity;
}
