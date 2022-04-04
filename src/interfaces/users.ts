export interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
    avatar: string;
    followers: [];
    following: [];
    posts: [];
}
// User Dto
export interface UserDto {
    email: string;
    name: string;
    password: string
}