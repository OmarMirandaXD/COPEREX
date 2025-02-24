import { body, param } from "express-validator";
import { validarCampos } from "../middlewares/validate-campos.js";
import { handleErrors } from "../middlewares/handle-error.js";

export const createEmpresaValidator = [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("nombre").isLength({ max: 50 }).withMessage("El nombre no puede exceder los 50 caracteres"),
    body("nivelImpacto").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("nivelImpacto").isIn(["Bajo", "Medio", "Alto"]).withMessage("El nivel de impacto debe ser 'Bajo', 'Medio' o 'Alto'"),
    body("fechaCreacion").notEmpty().withMessage("La fecha de creación es requerida"),
    body("fechaCreacion").isDate().withMessage("La fecha de creación debe ser una fecha válida"),
    body("categoria").notEmpty().withMessage("La categoría es requerida"),
    body("categoria").isLength({ max: 30 }).withMessage("La categoría no puede exceder los 30 caracteres"),
    validarCampos,
    handleErrors
];

export const updateEmpresaValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("nombre").optional().isLength({ max: 50 }).withMessage("El nombre no puede exceder los 50 caracteres"),
    body("nivelImpacto").optional().isIn(["Bajo", "Medio", "Alto"]).withMessage("El nivel de impacto debe ser 'Bajo', 'Medio' o 'Alto'"),
    body("fechaCreacion").optional().isDate().withMessage("La fecha de creación debe ser una fecha válida"),
    body("categoria").optional().isLength({ max: 30 }).withMessage("La categoría no puede exceder los 30 caracteres"),
    validarCampos,
    handleErrors
];