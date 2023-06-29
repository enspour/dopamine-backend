import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

import { User } from "@interfaces";
import { FollowingEntity } from "./following.entity";

export type UserEntityRelationsFields = "followers" | "followings";
export type UserEntityUpdatedFields = keyof Omit<
    UserEntity,
    UserEntityRelationsFields | "id" | "created_at" | "modified_at"
>;

@Entity({ name: "users" })
export class UserEntity
    implements User, Record<UserEntityRelationsFields, any>
{
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
