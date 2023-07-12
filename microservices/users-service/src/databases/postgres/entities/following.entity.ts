import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

import { UserEntity } from "./user.entity";

export type FollowingEntityFKNames = "follower" | "user";

@Entity({ name: "followings" })
export class FollowingEntity {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    followerId: number;

    @ManyToOne(() => UserEntity, (user) => user.followings, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.followers, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "followerId" })
    follower: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;
}
