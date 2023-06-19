import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { UserEntity } from "./user.entity";

import { UserEmail } from "@interfaces";

@Entity({ name: "users_emails" })
export class UserEmailEntity implements UserEmail {
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
