import { Request, Response } from 'express';
import { DetalleReserva } from '../models/detalle_reserva';
import { Reserva } from '../models/reserva';
import { Producto } from '../models/producto';


export const getDetallesReserva = async (req: Request, res: Response) => {
    try {
        const detallesReserva = await DetalleReserva.findAll({
            include: [
                { model: Reserva, attributes: ['COD_RESERVA'] },
                { model: Producto, attributes: ['COD_PRODUCTO'] }
            ],
            attributes: ['COD_DETALLE_RESERVA', 'CANTIDAD', 'SUBTOTAL']
        });
        res.json(detallesReserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de reserva.' });
    }
};

export const getDetalleReserva = async (req: Request, res: Response) => {
    const { cod_detalle_reserva } = req.params;
    try {
        const detalleReserva = await DetalleReserva.findByPk(cod_detalle_reserva, {
            include: [
                { model: Reserva, attributes: ['COD_RESERVA'] },
                { model: Producto, attributes: ['COD_PRODUCTO'] }
            ]
        });
        if (detalleReserva) {
            res.json(detalleReserva);
        } else {
            res.status(404).json({ error: 'Detalle de reserva no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle de reserva.' });
    }
};

export const updateDetalleReserva = async (req: Request, res: Response) => {
    const { cod_detalle_reserva } = req.params;
    const { cod_reserva, cod_producto, cantidad, subtotal } = req.body;
    try {
        const detalleReserva = await DetalleReserva.findByPk(cod_detalle_reserva);
        if (detalleReserva) {
            await detalleReserva.update({
                COD_RESERVA: cod_reserva,
                COD_PRODUCTO: cod_producto,
                CANTIDAD: cantidad,
                SUBTOTAL: subtotal
            });
            res.json(detalleReserva);
        } else {
            res.status(404).json({ error: 'Detalle de reserva no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el detalle de reserva.' });
    }
};

export const deleteDetalleReserva = async (req: Request, res: Response) => {
    const { cod_detalle_reserva } = req.params;
    try {
        const detalleReserva = await DetalleReserva.findByPk(cod_detalle_reserva);
        if (detalleReserva) {
            await detalleReserva.destroy();
            res.json({ mensaje: 'Detalle de reserva eliminado correctamente.' });
        } else {
            res.status(404).json({ error: 'Detalle de reserva no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el detalle de reserva.' });
    }
}
