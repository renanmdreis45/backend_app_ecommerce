import * as express from "express";
import { PurchaseController } from "../controllers/purchase.controller";

const Router = express.Router();

Router.get(
    "/purchases",
    PurchaseController.getPurchases,
);

Router.post("/purchase", PurchaseController.buyProduct);

export { Router as userRouter };