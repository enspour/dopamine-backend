import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BucketDocument = HydratedDocument<BucketEntity>;

@Schema()
export class BucketEntity {
    @Prop({ type: String })
    _id: string;

    @Prop({ type: [Number], default: [] })
    users: number[];
}

export const BucketSchema = SchemaFactory.createForClass(BucketEntity);

export const transformBucket = (obj: any) => {
    if (obj && typeof obj === "object" && "_id" in obj) {
        const bucket = { ...obj };

        bucket.name = bucket._id;
        delete bucket._id;

        return bucket;
    }

    return obj;
};

BucketSchema.method("transform", function () {
    const obj = this.toObject();
    return transformBucket(obj);
});
