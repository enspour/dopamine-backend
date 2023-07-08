import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PayloadTooLargeException,
    PipeTransform,
} from "@nestjs/common";

import { MimeTypes, fileExtensions, mimeTypes } from "@interfaces";

import { getFileExtension } from "@utils";

export interface UploadFilesOptions {
    maxCount?: number;
    minCount?: number;

    file?: {
        maxSize?: number;
        minSize?: number;
    };
}

const initialOptions: UploadFilesOptions = {
    maxCount: -1,
    minCount: -1,

    file: {
        maxSize: -1,
        minSize: -1,
    },
};

@Injectable()
export class UploadFilesPipe implements PipeTransform<Express.Multer.File[]> {
    private opts: UploadFilesOptions;

    constructor(opts?: UploadFilesOptions) {
        this.opts = Object.assign({}, initialOptions, opts);
    }

    async transform(
        files: Express.Multer.File[],
        { metatype }: ArgumentMetadata,
    ) {
        // files options
        const { maxCount, minCount } = this.opts;

        if (maxCount !== -1 && files.length > maxCount) {
            throw new BadRequestException("Too many files");
        }

        if (minCount !== -1 && files.length < minCount) {
            throw new BadRequestException("Too few files");
        }

        // file options
        if (!this.opts.file) {
            return files;
        }

        const { maxSize, minSize } = this.opts.file;

        for (let file of files) {
            if (maxSize !== -1 && file.size > maxSize) {
                throw new PayloadTooLargeException("File size is too large");
            }

            if (minSize !== -1 && file.size < minSize) {
                throw new BadRequestException("File size is too small");
            }

            if (!mimeTypes.includes(file.mimetype as MimeTypes)) {
                throw new BadRequestException("File type not supported");
            }

            const extname = getFileExtension(file.originalname);

            if (!fileExtensions.includes(extname)) {
                throw new BadRequestException("File extension not supported");
            }
        }

        return files;
    }
}
