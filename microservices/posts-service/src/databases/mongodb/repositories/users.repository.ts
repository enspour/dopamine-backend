import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { UserEntity } from "../schemas/user.schema";

import { UserUpdatedFieldsNames } from "@interfaces";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
    ) {}

    async createOne(id: number, nickname: string): Promise<UserEntity> {
        const user = new this.userModel({
            _id: id,
            nickname,
            name: id,
        });

        return await user.save();
    }

    async updateOne<K extends UserUpdatedFieldsNames>(
        id: number,
        field: K,
        value: UserEntity[K],
    ) {
        return await this.userModel
            .updateOne(
                { _id: id },
                {
                    $set: {
                        [field]: value,
                        modified_at: Date.now(),
                    },
                },
            )
            .exec();
    }
}
