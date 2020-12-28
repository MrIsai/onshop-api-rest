import { Router } from "express";
import * as shopController from '../controllers/shop.controller';
import { validateToken } from "../middlewares/authentication";

const router: Router = Router();
router.get('/', shopController.getShops);
router.post('/', validateToken, shopController.createShop);

export default router;