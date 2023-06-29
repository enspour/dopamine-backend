import Following from "./follower.interface";

export default interface User {
    id: number;
    nickname: string;
    name: string;
    avatar: string;
    status: string;
    created_at: Date;
    modified_at: Date;
    followers: Following[];
    followings: Following[];
}
