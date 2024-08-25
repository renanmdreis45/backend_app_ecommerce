import * as express from "express";
import { authentication} from "../middleware/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();

router.get(
    "/users",
    authentication,
    UserController.getUsers
);

router.post("/signup", UserController.signup);
router.post("/login", AuthController.login);

export {router as userRouter};