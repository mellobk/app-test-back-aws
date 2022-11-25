import { Router } from "express";
import * as inventoryController from "../controller/inventory.controller.js";
import { verifyToken } from "../middlewares/AuthorizationJwt.js";

const router = Router();

router.get("/getInventory/:id",verifyToken, inventoryController.getInventories);
router.post("/createInventory/:id",verifyToken, inventoryController.createInventory);
router.get("/getPdf/:id",verifyToken, inventoryController.getPdf);
router.post("/sendPdf/:id",verifyToken, inventoryController.sendPdf);
export default router;