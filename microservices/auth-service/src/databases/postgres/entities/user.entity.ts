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

export type UserEntityRelationsFields = "security" | "emails" | "password";

@Entity({ name: "users" })
export class UserEntity
    implements User, Record<UserEntityRelationsFields, any>
{
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("text")
    nickname: string;

    @Column("text")
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;

    @OneToOne(() => UserSecurityEntity, (security) => security.user, {
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
