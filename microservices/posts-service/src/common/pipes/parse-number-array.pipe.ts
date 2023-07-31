import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export default class ParseNumberArrayPipe
    implements PipeTransform<string, number[]>
{
    constructor() {}

    transform(value: string): number[] {
        const arr = value.split(",");

        if (arr && Array.isArray(arr)) {
            return arr.map(this.parseItem);
        }

        throw new BadRequestException("Validation failed");
    }

    private parseItem(item: string) {
        const value = parseInt(item);

        if (isNaN(value)) {
            throw new BadRequestException("Validation failed");
        }

        return value;
    }
}
