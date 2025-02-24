import { Router } from "express";
import { createEmpresa, getAllEmpresas, updateEmpresaById, generateReport } from "../empresas/empresas.controller.js";
import { createEmpresaValidator, updateEmpresaValidator } from "../middlewares/empresas-validator.js";

const router = Router();

router.post("/createEmpresa", createEmpresaValidator, createEmpresa);
router.get("/getAllEmpresas", getAllEmpresas);
router.put("/updateEmpresa/:id", updateEmpresaValidator, updateEmpresaById);
router.get("/generateReport", generateReport);

export default router;