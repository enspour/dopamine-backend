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
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    modifiedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

export const transformUser = (obj) => {
    if (obj && typeof obj === "object" && "_id" in obj) {
        const user = { ...obj };

        user.id = user._id;
        delete user._id;

        return user;
    }

    return obj;
};

UserSchema.method("transform", function () {
    const obj = this.toObject();
    return transformUser(obj);
});
