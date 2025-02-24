import { Schema, model } from "mongoose";

const empresaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        maxLength: [50, "El nombre no puede exceder los 50 caracteres"]
    },
    nivelImpacto: {
        type: String,
        required: [true, "El nivel de impacto es obligatorio"],
        enum: ["Bajo", "Medio", "Alto"]
    },
    fechaCreacion: {
        type: Date,
        required: [true, "La fecha de creación es obligatoria"]
    },
    categoria: {
        type: String,
        required: [true, "La categoría es obligatoria"],
        maxLength: [30, "La categoría no puede exceder los 30 caracteres"]
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: true
});

empresaSchema.virtual('añosTrayectoria').get(function() {
    const añoActual = new Date().getFullYear();
    const añoCreacion = this.fechaCreacion.getFullYear();
    return añoActual - añoCreacion;
});

empresaSchema.methods.toJSON = function () {
    const { _id, ...empresa } = this.toObject({ virtuals: true });
    empresa.uid = _id;
    return empresa;
};

export default model("Empresa", empresaSchema);