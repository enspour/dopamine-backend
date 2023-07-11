import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from "@nestjs/common";
import { Types, isValidObjectId } from "mongoose";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
    constructor() {}

    transform(value: any, metadata: ArgumentMetadata): Types.ObjectId {
        if (!isValidObjectId(value)) {
            throw new BadRequestException("Validation failed");
        }

        return new Types.ObjectId(value);
    }
}
