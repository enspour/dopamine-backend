import { Transform, TransformFnParams } from "class-transformer";

import { ArrayNotEmpty, MinLength, ValidateIf } from "class-validator";

export class CreatePostDto {
    @ValidateIf((post: CreatePostDto) => !!post.text || !post.files)
    @MinLength(1)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    text: string = "";

    @ValidateIf((post: CreatePostDto) => post.files.length > 0 || !post.text)
    @ArrayNotEmpty()
    @MinLength(1, { each: true })
    files: string[] = [];
}
