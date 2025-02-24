import Empresa from './empresas.model.js';
import ExcelJS from 'exceljs';

export const createEmpresa = async (req, res) => {
    try {
        const data = req.body;
        const nuevaEmpresa = new Empresa(data);
        await nuevaEmpresa.save();

        res.status(201).json({
            success: true,
            empresa: nuevaEmpresa
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al crear la empresa",
            error: err.message
        });
    }
};

export const getAllEmpresas = async (req, res) => {
    try {
        const { categoria, añosTrayectoria, orden } = req.query;
        let query = {};
        let sortOptions = {};

        if (categoria) {
            query.categoria = categoria;
        }

        if (añosTrayectoria) {
            const añoActual = new Date().getFullYear();
            const añoMinimo = añoActual - parseInt(añosTrayectoria);
            query.fechaCreacion = { $lte: new Date(`${añoMinimo}-01-01`) };
        }

        if (orden) {
            const [field, order] = orden.split(':');
            sortOptions[field] = order === 'desc' ? -1 : 1;
        }

        const empresas = await Empresa.find(query).sort(sortOptions);

        res.status(200).json({
            success: true,
            empresas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: error.message
        });
    }
};

export const updateEmpresaById = async (req, res) => {
    try {
        const data = req.body;
        const empresa = await Empresa.findById(req.params.id);

        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada'
            });
        }

        const updatedEmpresa = await Empresa.findByIdAndUpdate(req.params.id, data, { new: true });

        res.status(200).json({
            success: true,
            empresa: updatedEmpresa
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error al actualizar la empresa",
            error: error.message
        });
    }
};

export const generateReport = async (req, res) => {
    try {
        const empresas = await Empresa.find();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        worksheet.columns = [
            { header: 'ID', key: '_id', width: 30 },
            { header: 'Nombre', key: 'nombre', width: 30 },
            { header: 'Nivel de Impacto', key: 'nivelImpacto', width: 20 },
            { header: 'Fecha de Creación', key: 'fechaCreacion', width: 20 },
            { header: 'Categoría', key: 'categoria', width: 20 },
            { header: 'Fecha de Registro', key: 'fechaRegistro', width: 20 },
            { header: 'Años de Trayectoria', key: 'añosTrayectoria', width: 20 }
        ];

        empresas.forEach(empresa => {
            worksheet.addRow({
                ...empresa.toObject(),
                añosTrayectoria: empresa.añosTrayectoria
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=empresas.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al generar el reporte",
            error: error.message
        });
    }
};