import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

import { FollowingEntity } from "./following.entity";

import { User } from "@interfaces";

export type UserEntityFKNames = "followers" | "followings";
export type UserEntityUpdatedFields = keyof Omit<
    UserEntity,
    UserEntityFKNames | "id" | "created_at" | "modified_at"
>;

@Entity({ name: "users" })
export class UserEntity implements User, Record<UserEntityFKNames, any> {
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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;

    @OneToMany(() => FollowingEntity, (following) => following.follower)
    followers: FollowingEntity[];

    @OneToMany(() => FollowingEntity, (following) => following.user)
    followings: FollowingEntity[];
}
