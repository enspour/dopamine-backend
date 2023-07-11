import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types, isValidObjectId } from "mongoose";

@Injectable()
export default class ParseObjectIdPipe
    implements PipeTransform<any, Types.ObjectId>
{
    constructor() {}

    transform(value: any): Types.ObjectId {
        if (!isValidObjectId(value)) {
            throw new BadRequestException("Validation failed");
        }

        return new Types.ObjectId(value);
    }
}
