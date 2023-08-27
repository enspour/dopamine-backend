import { Types } from "mongoose";

import { FileMetadata } from "./file.interface";
import { User } from "./user.interface";

export interface Post {
    id: Types.ObjectId;
    text: string;
    files: FileMetadata[];
    owner: User;
    likes: User[];
    comments: Post[];
    createdAt: Date;
    modifiedAt: Date;
}
