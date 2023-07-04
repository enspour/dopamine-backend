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
    user_id: number;

    @PrimaryColumn()
    follower_id: number;

    @ManyToOne(() => UserEntity, (user) => user.followings, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "user_id" })
    user: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.followers, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "follower_id" })
    follower: UserEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;
}
