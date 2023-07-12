import { User } from "./user.interface";

export interface Following {
    user: User;
    follower: User;
    createdAt: Date;
    modifiedAt: Date;
}
