import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { payload } from "../dto/createuser.dto";

dotenv.config();
const {JWT_KEY} = process.env;
export class encrypt {
    static async encryptpass(password: string) {
        return bcrypt.hashSync(password, 12);
    }
    static comparepassword(hashPassword: string, password: string) {
        return bcrypt.compareSync(password, hashPassword);
    }

    static generateToken(payload: payload) {
        return jwt.sign(payload, JWT_KEY, {expiresIn: "1d"});
    }
}