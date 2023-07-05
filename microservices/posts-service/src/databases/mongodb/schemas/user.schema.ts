import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<UserEntity>;

@Schema()
export class UserEntity {
    @Prop({ type: Number })
    _id: number;

    @Prop({ unique: true })
    name: string;

    @Prop({ required: true })
    nickname: string;

    @Prop({ default: "" })
    avatar: string;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    modified_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
