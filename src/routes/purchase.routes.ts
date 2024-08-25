import * as express from "express";
import { PurchaseController } from "../controllers/purchase.controller";

const router = express.Router();

router.get(
    "/purchases",
    PurchaseController.getPurchases,
);

router.post("/purchase", PurchaseController.buyProduct);

export { router as purchaseRouter };