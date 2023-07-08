import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from "@nestjs/common";

export interface ParseStringOptions {
    minLength?: number;
    maxLength?: number;
}

const initialOpts: ParseStringOptions = {
    minLength: -1,
    maxLength: -1,
};

@Injectable()
export class ValidateStringPipe implements PipeTransform {
    private opts: ParseStringOptions;

    constructor(opts?: ParseStringOptions) {
        this.opts = Object.assign({}, initialOpts, opts);
    }

    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value !== "string") {
            throw new BadRequestException("Validation failed");
        }

        if (this.opts.minLength !== -1 && this.opts.minLength > value.length) {
            throw new BadRequestException("Validation failed");
        }

        if (this.opts.maxLength !== -1 && this.opts.maxLength < value.length) {
            throw new BadRequestException("Validation failed");
        }

        return value;
    }
}
