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

@Entity({ name: "users_security" })
export class UserSecurityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("boolean")
    TFAByEmail: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

    @OneToOne(() => UserEntity, (user) => user.security, {
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user: UserEntity;
}
