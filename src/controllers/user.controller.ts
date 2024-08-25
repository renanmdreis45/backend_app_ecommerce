import { Request, Response } from "express";
import { encrypt } from "../helpers/helpers";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import * as cache from "memory-cache";

export class UserController {
    static async signup(req: Request, res: Response) {
        const {email, name, password} = req.body;
        console.log(req.body);
        const encryptedPassword = await encrypt.encryptpass(password);
        const user = new User();

        user.email = email;
        user.name = name;
        user.password = encryptedPassword;

        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save(user);

        const token = encrypt.generateToken({id: user.id});

        return res
            .status(200)
            .json({message: "User created successfully", token, user});
    }

    static async getUsers(req: Request, res: Response) {
        const data = cache.get("data");

        if(data) {
            console.log("Serving from cache");
            return res.status(200).json({
                data,
            })
        } else {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
    
            cache.put("data", users, 6000);
            return res.status(200).json({
                data: users,
            });
        }

    }
}