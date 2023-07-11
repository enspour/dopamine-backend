import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

import { FileEntity, transformFile } from "./file.schema";

export type LinkDocument = HydratedDocument<LinkEntity>;

@Schema()
export class LinkEntity {
    @Prop({
        type: SchemaTypes.ObjectId,
        ref: FileEntity.name,
        required: true,
    })
    file: Types.ObjectId | FileEntity;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const LinkSchema = SchemaFactory.createForClass(LinkEntity);

export const transformLink = (obj: any) => {
    if (obj && typeof obj === "object" && "_id" in obj) {
        const link = { ...obj };

        link.id = link._id;
        delete link._id;

        link.file = transformFile(link.file);

        return link;
    }

    return obj;
};

LinkSchema.method("transform", function () {
    const obj = this.toObject();
    return transformLink(obj);
});
