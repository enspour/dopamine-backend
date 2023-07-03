import { IsEmail, Matches } from "class-validator";

import regex from "@regex";

export class LoginDto {
    @IsEmail()
    email: string;

    @Matches(regex.password)
    password: string;
}
