import { Request, Response } from 'express';
import { Detalle_Factura } from '../models/detalle_factura';
import { Facturas } from '../models/facturas';
import { Producto } from '../models/producto';

export const getDetallesFactura = async (req: Request, res: Response) => {
    try {
        const detallesFactura = await Detalle_Factura.findAll({
            include: [
                { model: Facturas, attributes: ['COD_FACTURA'] },
                { model: Producto, attributes: ['COD_PRODUCTO'] }
            ],
            attributes: ['COD_DETALLE_FACTURA', 'CANTIDAD', 'SUBTOTAL']
        });
        res.json(detallesFactura);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de factura.' });
    }
};

export const getDetalleFactura = async (req: Request, res: Response) => {
    const { cod_detalle_factura } = req.params;
    try {
        const detalleFactura = await Detalle_Factura.findByPk(cod_detalle_factura, {
            include: [
                { model: Facturas, attributes: ['COD_FACTURA'] },
                { model: Producto, attributes: ['COD_PRODUCTO'] }
            ]
        });
        if (detalleFactura) {
            res.json(detalleFactura);
        } else {
            res.status(404).json({ error: 'Detalle de factura no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle de factura.' });
    }
};

export const updateDetalleFactura = async (req: Request, res: Response) => {
    const { cod_detalle_factura } = req.params;
    const { cod_factura, cod_producto, cantidad, subtotal } = req.body;
    try {
        const detalleFactura = await Detalle_Factura.findByPk(cod_detalle_factura);
        if (detalleFactura) {
            await detalleFactura.update({
                COD_FACTURA: cod_factura,
                COD_PRODUCTO: cod_producto,
                CANTIDAD: cantidad,
                SUBTOTAL: subtotal
            });
            res.json(detalleFactura);
        } else {
            res.status(404).json({ error: 'Detalle de factura no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el detalle de factura.' });
    }
};

export const deleteDetalleFactura = async (req: Request, res: Response) => {
    const { cod_detalle_factura } = req.params;
    try {
        const detalleFactura = await Detalle_Factura.findByPk(cod_detalle_factura);
        if (detalleFactura) {
            await detalleFactura.destroy();
            res.json({ mensaje: 'Detalle de factura eliminado correctamente.' });
        } else {
            res.status(404).json({ error: 'Detalle de factura no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el detalle de factura.' });
    }
};
