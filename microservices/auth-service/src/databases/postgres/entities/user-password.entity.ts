import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { UserEntity } from "./user.entity";

@Entity({ name: "users_passwords" })
export class UserPasswordEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    hashedPassword: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

    @OneToOne(() => UserEntity, (user) => user.password, {
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user: UserEntity;
}
