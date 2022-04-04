import { Request, Response } from "express";
import { AddUserErr } from "../constants/users.service";
import { UserDto } from "../interfaces/users";
import AuthService from "../services/auth";

export default class AuthController {
    private authService: AuthService = new AuthService()
    // signUp Handler
    signUpHandler = async (req: Request, res: Response) => {
        try {
            // req body
            const signUpDto = req.body as UserDto;
            // signUp User Response
            const signUpRes = await this.authService.signUp(signUpDto);
            console.log(signUpRes)
            // check if user is exist
            if(signUpRes === AddUserErr.USER_IS_EXIST){
                res.status(400).send(AddUserErr.USER_IS_EXIST);
                return
            }
            // usr is signed successffly
            res.send(signUpRes)
        } catch (error) {
            console.log("rejected");
            res.status(500).send(error)
        }
    }
}