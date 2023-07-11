import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { UserEntity } from "@mongodb/schemas/user.schema";

import { User, UserUpdatedFieldsNames } from "@interfaces";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
    ) {}

    async createOne(id: number, nickname: string): Promise<User> {
        const doc = new this.userModel({
            _id: id,
            nickname,
            name: id,
        });

        const user = await doc.save();

        return this.transform(user);
    }

    async updateOne<K extends UserUpdatedFieldsNames>(
        id: number,
        field: K,
        value: UserEntity[K],
    ) {
        const result = await this.userModel
            .updateOne(
                { _id: id },
                {
                    $set: {
                        [field]: value,
                        modifiedAt: Date.now(),
                    },
                },
            )
            .exec();

        if (result.modifiedCount) {
            return true;
        }

        return false;
    }

    private transform(user: UserEntity): User {
        if ("transform" in user && typeof user.transform === "function") {
            return user.transform();
        }

        throw new Error("Not found transform method");
    }
}
