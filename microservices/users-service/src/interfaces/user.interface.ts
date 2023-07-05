import { Following } from "./follower.interface";

export interface User {
    id: number;
    nickname: string;
    name: string;
    avatar: string;
    status: string;
    created_at: Date;
    modified_at: Date;
    followers: Following[];
    followings: Following[];
}

export const userUpdatedFieldsNames = [
    "nickname",
    "name",
    "avatar",
    "status",
] as const;

export type UserUpdatedFieldsNames = (typeof userUpdatedFieldsNames)[number];
