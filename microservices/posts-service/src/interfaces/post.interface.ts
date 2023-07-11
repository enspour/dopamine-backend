import { Types } from "mongoose";

import { User } from "./user.interface";

export interface Post {
    id: Types.ObjectId;
    text: string;
    images: string[];
    owner: User;
    likes: User[];
    comments: Post[];
    createdAt: Date;
    modifiedAt: Date;
}
