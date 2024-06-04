import { Request, Response, NextFunction } from 'express';
import { Facturas } from '../models/facturas';

export const getFacturas = async (req: Request, res: Response) => {
    try {
        const listaFacturas = await Facturas.findAll();
        res.json(listaFacturas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las facturas.' });
    }
};

export const newFactura = async (req: Request, res: Response) => {
    const { COD_CLIENTE, FECHA_EMISION, FECHA_VENCIMIENTO, MONTO_TOTAL, ESTADO } = req.body;
    try {
        await Facturas.create({
            COD_CLIENTE,
            FECHA_EMISION,
            FECHA_VENCIMIENTO,
            MONTO_TOTAL,
            ESTADO,
        });
        return res.status(201).json({
            msg: 'Factura creada correctamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al crear la factura',
            error,
        });
    }
};

export const updateFactura = async (req: Request, res: Response) => {
    const { COD_FACTURA } = req.params;
    const { COD_CLIENTE, FECHA_EMISION, FECHA_VENCIMIENTO, MONTO_TOTAL, ESTADO } = req.body;
    try {
        const factura = await Facturas.findByPk(COD_FACTURA);
        if (!factura) {
            return res.status(404).json({
                msg: 'Factura no encontrada',
            });
        }
        await factura.update({
            COD_CLIENTE,
            FECHA_EMISION,
            FECHA_VENCIMIENTO,
            MONTO_TOTAL,
            ESTADO,
        });
        return res.json({
            msg: 'Factura actualizada correctamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al actualizar la factura',
            error,
        });
    }
};

export const deleteFactura = async (req: Request, res: Response) => {
    const { COD_FACTURA } = req.params;
    try {
        const factura = await Facturas.findByPk(COD_FACTURA);
        if (!factura) {
            return res.status(404).json({
                msg: 'Factura no encontrada',
            });
        }
        await factura.destroy();
        return res.json({
            msg: 'Factura eliminada correctamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al eliminar la factura',
            error,
        });
    }
};
