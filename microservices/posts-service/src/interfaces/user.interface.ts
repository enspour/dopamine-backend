export interface User {
    id: number;
    nickname: string;
    name: string;
    avatar: string;
}

export const userUpdatedFieldsNames = ["name", "nickname", "avatar"] as const;

export type UserUpdatedFieldsNames = (typeof userUpdatedFieldsNames)[number];
