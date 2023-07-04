import { IsMongoId, MinLength } from "class-validator";

export class UpdatePostTextDto {
    @IsMongoId()
    id: string;

    @MinLength(1)
    text: string;
}
