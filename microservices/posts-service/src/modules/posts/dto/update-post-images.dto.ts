import { IsMongoId, MinLength } from "class-validator";

export class UpdatePostImagesDto {
    @IsMongoId()
    id: string;

    @MinLength(1, { each: true })
    images: string[];
}
