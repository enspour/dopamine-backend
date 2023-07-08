import * as path from "node:path";

import { FileExtension } from "@interfaces";

export const getFileExtension = (filename: string): FileExtension => {
    const extname = path.extname(filename) || "";
    if (extname) {
        return extname.split(".").pop() as FileExtension;
    }

    throw new Error("getFileExtension: don't receive file extension");
};
