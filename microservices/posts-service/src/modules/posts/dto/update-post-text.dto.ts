import { IsMongoId, MinLength } from "class-validator";
import { Types } from "mongoose";

export class UpdatePostTextDto {
    @IsMongoId()
    id: Types.ObjectId;

    @MinLength(1)
    text: string;
}
