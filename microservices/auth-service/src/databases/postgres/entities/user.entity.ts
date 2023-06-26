import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { UserEmailEntity } from "./user-email.entity";
import { UserPasswordEntity } from "./user-password.entity";
import { UserSecurityEntity } from "./user-security.entity";

import { User } from "@interfaces";

export type UserEntityRelations = "security" | "emails" | "password";

@Entity({ name: "users" })
export class UserEntity implements User, Record<UserEntityRelations, any> {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("text")
    nickname: string;

    @Column("text")
    avatar: string;

    @CreateDateColumn({ name: "created_at" })
    created_at: Date;

    @UpdateDateColumn({ name: "modified_at" })
    modified_at: Date;

    @OneToOne(() => UserSecurityEntity, (settings) => settings.user, {
        cascade: true,
    })
    security: UserSecurityEntity;

    @OneToOne(() => UserPasswordEntity, (password) => password.user, {
        cascade: true,
    })
    password: UserPasswordEntity;

    @OneToMany(() => UserEmailEntity, (emails) => emails.user, {
        cascade: true,
    })
    emails: UserEmailEntity[];
}
