import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from "@nestjs/common";

import regex from "@regex";

@Injectable()
export default class ParseEmailPipe implements PipeTransform {
    constructor() {}

    transform(email: string, metadata: ArgumentMetadata) {
        if (email.match(regex.email)) {
            return email;
        }

        throw new BadRequestException("Validation failed");
    }
}
