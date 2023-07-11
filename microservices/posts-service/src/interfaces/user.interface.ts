export interface User {
    id: number;
    nickname: string;
    name: string;
    avatar: string;
    createdAt: Date;
    modifiedAt: Date;
}

export const userUpdatedFieldsNames = ["name", "nickname", "avatar"] as const;

export type UserUpdatedFieldsNames = (typeof userUpdatedFieldsNames)[number];
