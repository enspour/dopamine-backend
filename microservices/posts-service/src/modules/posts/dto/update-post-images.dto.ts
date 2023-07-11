import { IsMongoId, MinLength } from "class-validator";
import { Types } from "mongoose";

export class UpdatePostImagesDto {
    @IsMongoId()
    id: Types.ObjectId;

    @MinLength(1, { each: true })
    images: string[];
}
