import { Types } from "mongoose";

export interface UpdateFileAccessDto {
    fileId: Types.ObjectId;
    userId: number;
}
