import { IsEmail, Matches, MinLength } from "class-validator";

import regex from "@regex";

export class SignupDto {
    @MinLength(4)
    nickname: string;

    @IsEmail()
    email: string;

    @Matches(regex.password)
    password: string;
}
