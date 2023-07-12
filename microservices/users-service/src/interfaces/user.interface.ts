import { Following } from "./follower.interface";

export interface User {
    id: number;
    nickname: string;
    name: string;
    avatar: string;
    status: string;
    followers: Following[];
    followings: Following[];
    createdAt: Date;
    modifiedAt: Date;
}

export const userUpdatedFieldsNames = [
    "nickname",
    "name",
    "avatar",
    "status",
] as const;

export type UserUpdatedFieldsNames = (typeof userUpdatedFieldsNames)[number];
