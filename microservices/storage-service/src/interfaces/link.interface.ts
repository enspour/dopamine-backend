import { Types } from "mongoose";

import { File } from "./file.interface";

export interface Link {
    id: Types.ObjectId;
    file: File;
    createdAt: Date;
}
