import { Router } from "express";
import * as companyController from "../controller/company.controller.js";
import { verifyToken } from "../middlewares/AuthorizationJwt.js";

const router = Router();

router.get("/getComapines",verifyToken, companyController.getCompanies);
router.post("/createCompany",verifyToken, companyController.createCompany);
router.delete("/deleteCompany/:id",verifyToken, companyController.deleteCompany);
router.patch("/updateCompany/:id",verifyToken, companyController.editCompany);
export default router;