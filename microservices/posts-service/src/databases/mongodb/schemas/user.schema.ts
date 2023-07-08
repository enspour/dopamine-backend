import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<UserEntity>;

@Schema()
export class UserEntity {
    @Prop({ type: Number })
    _id: number;

    @Prop({ type: String, unique: true })
    name: string;

    @Prop({ type: String, required: true })
    nickname: string;

    @Prop({ type: String, default: "" })
    avatar: string;

    @Prop({ type: Date, default: Date.now })
    created_at: Date;

    @Prop({ type: Date, default: Date.now })
    modified_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
