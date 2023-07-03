import { IsEmail, IsString, Matches, MinLength } from "class-validator";

import regex from "@regex";

export class SignupDto {
    @MinLength(4)
    @IsString()
    nickname: string;

    @IsEmail()
    email: string;

    @Matches(regex.password)
    password: string;
}
