import { User, UserUpdatedFieldsNames } from "@interfaces";

export interface UpdateUserFieldDto {
    id: number;
    field: UserUpdatedFieldsNames;
    value: User[UserUpdatedFieldsNames];
}
