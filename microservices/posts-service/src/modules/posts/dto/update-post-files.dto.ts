import { IsMongoId, MinLength } from "class-validator";
import { Types } from "mongoose";

export class UpdatePostFilesDto {
    @IsMongoId()
    id: Types.ObjectId;

    @MinLength(1, { each: true })
    files: string[];
}
