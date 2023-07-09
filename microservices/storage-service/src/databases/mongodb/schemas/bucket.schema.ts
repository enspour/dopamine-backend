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
