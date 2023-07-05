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
    TFA_by_email: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;

    @OneToOne(() => UserEntity, (user) => user.security, {
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user: UserEntity;
}
