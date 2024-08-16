import * as express from "express";
import { authentication, authorization} from "../middleware/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";

const Router = express.Router();

Router.get(
    "/users",
    authentication,
    authorization(["admin"]),
    UserController.getUsers
);

Router.get(
    "/profile",
    authentication,
    authorization(["user", "admin"]),
    AuthController.getProfile
);

Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);

export {Router as userRouter};