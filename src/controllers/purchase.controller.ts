import { Request, Response } from "express";
import { encrypt } from "../helpers/helpers";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import * as cache from "memory-cache";
import { Purchase } from "../entity/Purchase";

export class PurchaseController {
    static async buyProduct(req: Request, res: Response) {
        const { productId, name, description, category, price, quantity, material, department, userName } = req.body;
        const purchase = new Purchase();
        
        purchase.productId = productId;
        purchase.name = name;
        purchase.description = description;
        purchase.category = category;
        purchase.price = price;
        purchase.material = material;
        purchase.department = department;
        purchase.userName = userName;

        const purchaseRepository = AppDataSource.getRepository(Purchase);
        
        const existentProduct = await purchaseRepository.findOne({
            where: {
                productId: productId,
            }
        });

        if(existentProduct) {
            purchase.quantity = quantity + existentProduct.quantity;
        } else {
            purchase.quantity = quantity;
        }

        await purchaseRepository.save(purchase);

        return res
            .status(200)
            .json({ message: "Purchase finished with success", purchase});
    }

    static async getPurchases(req: Request, res: Response) {
        const data = cache.get("data");

        if (data) {
            console.log("Serving from cache");
            return res.status(200).json({
                data,
            })
        } else {
            const purchaseRepository = AppDataSource.getRepository(Purchase);
            const purchases = await purchaseRepository.find();

            cache.put("data", purchases, 6000);
            return res.status(200).json({
                data: purchases,
            });
        }

    }
}