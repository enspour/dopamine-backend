import UserEmail from "./user-email.interface";
import UserPassword from "./user-password.interface";
import UserSecurity from "./user-security.interface";

export default interface User {
    id: number;
    nickname: string;
    avatar: string;
    security: UserSecurity;
    emails: UserEmail[];
    password: UserPassword;
    created_at: Date;
    modified_at: Date;
}
