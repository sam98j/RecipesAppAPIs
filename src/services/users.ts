import { AddUserErr, GetUserErr } from "../constants/users.service";
import { User, UserDto } from "../interfaces/users";
import userModel from "../models/users"
import { hashPassword } from "../utils/auth";

export class UserService {
    // get client by email
    getUserByEmail = (email: string): Promise<User | GetUserErr> => {
        return new Promise(async (resolve, reject) => {
            try {
                // get the user from the db
                const user = await userModel.findOne({email});
                // check if user is not exist
                if(user === null) {
                    resolve(GetUserErr.USER_NOT_EXIST)
                    return
                }
                // user is exist
                resolve(user as User);
            } catch (error) {
                reject(error)
            }
        })
    }
    // add new user
    addNewUser = (userData: UserDto): Promise<AddUserErr | User> => {
        return new Promise(async (resolve, reject) => {
            try {
                // get the client by email
                const user = await this.getUserByEmail(userData.email);
                // check if usr is exist
                if(user !== GetUserErr.USER_NOT_EXIST) {
                    resolve(AddUserErr.USER_IS_EXIST);
                    return
                }
                // if client is not exist
                const newUserData = {
                    ...userData,
                    avatar: "",
                    posts: [],
                    followers: [],
                    following: []
                } as User
                // add the new client
                const newUser = new userModel(newUserData);
                // hash the user password
                newUser.password = await hashPassword(userData.password);
                await newUser.save();
                resolve(newUserData);
            } catch (error) {
                reject(error)
            }
        })
    }
}