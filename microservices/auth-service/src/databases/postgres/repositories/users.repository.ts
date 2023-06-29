import { Inject } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import { UserEmailEntity } from "@postgres/entities/user-email.entity";
import { UserPasswordEntity } from "@postgres/entities/user-password.entity";
import { UserSecurityEntity } from "@postgres/entities/user-security.entity";
import {
    UserEntity,
    UserEntityRelationsFields,
} from "@postgres/entities/user.entity";

import constants from "@constants";

const { POSTGRES } = constants.injections;

export class UsersRepository {
    private repository: Repository<UserEntity>;

    constructor(@Inject(POSTGRES) postgres: DataSource) {
        this.repository = postgres.getRepository(UserEntity);
    }

    async findOneById<T extends UserEntityRelationsFields = never>(
        id: number,
        relations: Record<T, boolean> = <Record<T, boolean>>{},
    ): Promise<Omit<UserEntity, Exclude<UserEntityRelationsFields, T>> | null> {
        return await this.repository.findOne({
            where: {
                id,
            },
            relations,
        });
    }

    async findOneByEmail<T extends UserEntityRelationsFields = never>(
        email: string,
        relations: Record<T, boolean> = <Record<T, boolean>>{},
    ): Promise<Omit<UserEntity, Exclude<UserEntityRelationsFields, T>> | null> {
        return await this.repository.findOne({
            where: {
                emails: {
                    email,
                },
            },
            relations,
        });
    }

    async removeOneById(id: number) {
        return await this.repository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
    }

    async createOne(
        nickname: string,
        email: string,
        hashed_password: string,
    ): Promise<Omit<UserEntity, "password">> {
        const userSecurity = new UserSecurityEntity();
        userSecurity.TFA_by_email = false;

        const userPassword = new UserPasswordEntity();
        userPassword.hashed_password = hashed_password;

        const userEmail = new UserEmailEntity();
        userEmail.email = email;
        userEmail.confirm = false;

        const user = new UserEntity();
        user.nickname = nickname;
        user.avatar = "";

        user.security = userSecurity;
        user.password = userPassword;
        user.emails = [userEmail];

        const saved = await this.repository.save(user);

        const { password, ...result } = saved;

        return result;
    }
}
