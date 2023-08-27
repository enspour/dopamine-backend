import { Types } from "mongoose";

import { FileMetadata } from "./file-metadata.interface";

export interface Link {
    id: Types.ObjectId;
    file: FileMetadata;
    createdAt: Date;
}
