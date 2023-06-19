import { Injectable } from "@nestjs/common";
import ValidateStringPipe from "./validate-string.pipe";

@Injectable()
export default class ParseCodePipe extends ValidateStringPipe {
    constructor() {
        super({
            minLength: 6,
            maxLength: 6,
        });
    }
}
