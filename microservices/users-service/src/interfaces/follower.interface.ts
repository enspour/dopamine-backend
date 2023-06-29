import User from "./user.interface";

export default interface Following {
    user: User;
    follower: User;
    created_at: Date;
    modified_at: Date;
}
