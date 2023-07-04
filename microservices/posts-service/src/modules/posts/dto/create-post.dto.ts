import { ArrayNotEmpty, MinLength, ValidateIf } from "class-validator";

export class CreatePostDto {
    @ValidateIf((post: CreatePostDto) => !!post.text || !post.images)
    @MinLength(1)
    text?: string = "";

    @ValidateIf((post: CreatePostDto) => post.images.length > 0 || !post.text)
    @ArrayNotEmpty()
    @MinLength(1, { each: true })
    images?: string[] = [];
}
