import { Transform, TransformFnParams } from "class-transformer";

import { ArrayNotEmpty, MinLength, ValidateIf } from "class-validator";

import { FileMetadata } from "@interfaces";

export class CreatePostDto {
    @ValidateIf((post: CreatePostDto) => !!post.text || post.files.length <= 0)
    @MinLength(1)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    text: string = "";

    @ValidateIf((post: CreatePostDto) => post.files.length > 0 || !post.text)
    @ArrayNotEmpty()
    files: FileMetadata[] = [];
}
