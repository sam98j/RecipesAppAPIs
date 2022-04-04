import { User } from "./users";

export interface SignUpRes {
    accessToken: string;
    user: User
}