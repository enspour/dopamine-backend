import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from "@nestjs/common";
import { isValidObjectId } from "mongoose";

@Injectable()
export default class ParseObjectIdPipe implements PipeTransform {
    constructor() {}

    transform(value: any, metadata: ArgumentMetadata) {
        if (!isValidObjectId(value)) {
            throw new BadRequestException("Validation failed");
        }

        return value;
    }
}
