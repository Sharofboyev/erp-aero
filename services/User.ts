import jwt from "jsonwebtoken";
import config from "../config";
import bcrypt from "bcrypt";
import {
  addToken as addToBlackList,
  getUser,
  insertUser,
  validateToken
} from "../models/user.db";

type UserSchema = {
  id: number;
  password: string;
};

class User {
  async signIn(
    id: Number,
    password: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      let user = await getUser(id);
      let signed = bcrypt.compareSync(password, (user as UserSchema).password);
      if (signed) return { success: true };
      throw new Error("Wrong password or id");
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  }

  async logOut() {}
  async refreshToken() {}
  async signUp(password: string) {
    try {
        let hash = bcrypt.hashSync(password, 10);
      let userId = await insertUser(hash);
      let accessToken = jwt.sign({ id: userId }, config.secretKey, {
        expiresIn: config.tokenLife
      });
      let refreshToken = jwt.sign({}, config.refreshTokenSecretKey, {
        expiresIn: config.refreshTokenLife
      });
      return { success: true, data: { userId, refreshToken, accessToken } };
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  }

  async blockToken(token: string) {
    try {
      await addToBlackList(token);
      return { success: true };
    } catch (err) {
        return { success: false, message: (err as Error).message };
    }
  }

  async checkToken(token: string) {
    try {
      await validateToken(token);
      return true;
    } catch (err) {
      return false
    }
  }
}

export default User;
