import { Types } from "mongoose";

import { Bucket } from "./bucket.interface";
import { FileAccess } from "./file-access.interface";
import { FileExtension } from "./file-extension.interface";

export interface File {
    id: Types.ObjectId;
    name: string;
    size: number;
    extension: FileExtension;
    ownerId: number;
    access: FileAccess;
    bucket: Bucket;
    createdAt: Date;
    modifiedAt: Date;
}
