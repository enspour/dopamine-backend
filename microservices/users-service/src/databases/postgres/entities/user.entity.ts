import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

import { FollowingEntity } from "./following.entity";

export type UserEntityFKNames = "followers" | "followings";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryColumn()
    id: number;

    @Column("text")
    nickname: string;

    @Column("text", { unique: true })
    name: string;

    @Column("text")
    avatar: string;

    @Column("text")
    status: string;

    @OneToMany(() => FollowingEntity, (following) => following.follower)
    followers: FollowingEntity[];

    @OneToMany(() => FollowingEntity, (following) => following.user)
    followings: FollowingEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;
}
