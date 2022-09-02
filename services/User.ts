import jwt from "jsonwebtoken";
import config from "../config";
import bcrypt from "bcrypt";
import {getUser, insertUser} from "../models/user.db";

type UserSchema = {
    id: number,
    password: string
}

class User {
    async signIn(id: Number, password: string): Promise <{success: boolean, message?: string }>{
        try {
            let user = await getUser(id);
            let signed = bcrypt.compareSync(password, (user as UserSchema).password);
            if (signed)
                return {success: true};
            throw new Error("Wrong password or id");
        }
        catch(err){
            return {success: false, message: (err as Error).message}
        }
    }
    async logOut(){

    }
    async refreshToken(){

    }
    async signUp(){

    }
}

export default User