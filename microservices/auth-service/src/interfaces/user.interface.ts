import { UserEmail } from "./user-email.interface";
import { UserPassword } from "./user-password.interface";
import { UserSecurity } from "./user-security.interface";

export interface User {
    id: number;
    nickname: string;
    avatar: string;
    security: UserSecurity;
    emails: UserEmail[];
    password: UserPassword;
    created_at: Date;
    modified_at: Date;
}

export const userUpdatedFieldsNames = ["nickname", "avatar"] as const;

export type UserUpdatedFieldsNames = (typeof userUpdatedFieldsNames)[number];
