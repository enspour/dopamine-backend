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

export type UserEntityFKNames = "security" | "emails" | "password";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("text")
    nickname: string;

    @Column("text")
    avatar: string;

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;
}
