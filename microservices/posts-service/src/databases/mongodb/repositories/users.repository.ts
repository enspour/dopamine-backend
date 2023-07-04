import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User } from "../schemas/user.schema";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createOne(id: number, nickname: string): Promise<User> {
        const user = new this.userModel({
            _id: id,
            nickname,
            name: id,
        });

        return await user.save();
    }
}
