import { Router } from "express";
import { createEmpresa, getAllEmpresas, updateEmpresaById, generateReport } from "../empresas/empresas.controller.js";
import { createEmpresaValidator, updateEmpresaValidator } from "../middlewares/empresas-validator.js";

const router = Router();

/**
 * @swagger
 * /coperex/v1/empresas/createEmpresa:
 *   post:
 *     summary: Create a new empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa created successfully
 *       400:
 *         description: Bad request
 */
router.post("/createEmpresa", createEmpresaValidator, createEmpresa);

/**
 * @swagger
 * /coperex/v1/empresas/getAllEmpresas:
 *   get:
 *     summary: Get all empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: A list of empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 */
router.get("/getAllEmpresas", getAllEmpresas);

/**
 * @swagger
 * /coperex/v1/empresas/updateEmpresa/{id}:
 *   put:
 *     summary: Update an empresa by ID
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa updated successfully
 *       400:
 *         description: Bad request
 */
router.put("/updateEmpresa/:id", updateEmpresaValidator, updateEmpresaById);

/**
 * @swagger
 * /coperex/v1/empresas/generateReport:
 *   get:
 *     summary: Generate a report
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Report generated successfully
 *       400:
 *         description: Bad request
 */
router.get("/generateReport", generateReport);

export default router;