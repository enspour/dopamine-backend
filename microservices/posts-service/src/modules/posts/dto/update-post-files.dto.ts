import { ArrayNotEmpty, IsMongoId } from "class-validator";
import { Types } from "mongoose";

import { FileMetadata } from "@interfaces";

export class UpdatePostFilesDto {
    @IsMongoId()
    id: Types.ObjectId;

    @ArrayNotEmpty()
    files: FileMetadata[];
}
