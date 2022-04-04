import { AddUserErr } from "../constants/users.service";
import { UserDto } from "../interfaces/users";
import { UserService } from "./users";
import jwt from 'jsonwebtoken'
import { SignUpRes } from "../interfaces/auth.service";

export default class AuthService {
    private userService: UserService = new UserService();
    // signUp service
    signUp = (userData: UserDto): Promise<AddUserErr | SignUpRes> => {
        return new Promise(async (resolve, reject) => {
            try {
                // add new User
                const addNewUserRes = await this.userService.addNewUser(userData);
                // check if user is not added 
                if(addNewUserRes === AddUserErr.USER_IS_EXIST) {
                    resolve(AddUserErr.USER_IS_EXIST);
                    return
                }
                // user is added succesffuly
                const accessToken = jwt.sign({userId: addNewUserRes._id}, process.env.JWT_SECRET!);
                // remove passowrd from res obj
                delete addNewUserRes.password;
                resolve({accessToken, user: addNewUserRes})
            } catch (error) {
                reject(error)
            }
        })
    }
}