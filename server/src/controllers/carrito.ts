import { Request, Response, NextFunction } from 'express';
import { Carrito } from '../models/carrito';

export const getCarritos = async (req: Request, res: Response) => {
    try {
        const listaCarritos = await Carrito.findAll();
        res.json(listaCarritos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los carritos.' });
    }
};

export const newCarrito = async (req: Request, res: Response) => {
    const { COD_PRODUCTO, COSTO_TOTAL } = req.body;
    try {
        await Carrito.create({
            COD_PRODUCTO,
            COSTO_TOTAL,
        });
        return res.status(201).json({
            msg: 'Carrito creado correctamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al crear el carrito',
            error,
        });
    }
};

export const updateCarrito = async (req: Request, res: Response) => {
    const { COD_CARRITO } = req.params;
    const { COD_PRODUCTO, COSTO_TOTAL } = req.body;
    try {
        const carrito = await Carrito.findByPk(COD_CARRITO);
        if (!carrito) {
            return res.status(404).json({
                msg: 'Carrito no encontrado',
            });
        }
        await carrito.update({
            COD_PRODUCTO,
            COSTO_TOTAL,
        });
        return res.json({
            msg: 'Carrito actualizado correctamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al actualizar el carrito',
            error,
        });
    }
};

export const deleteCarrito = async (req: Request, res: Response) => {
    const { COD_CARRITO } = req.params;
    try {
        const carrito = await Carrito.findByPk(COD_CARRITO);
        if (!carrito) {
            return res.status(404).json({
                msg: 'Carrito no encontrado',
            });
        }
        await carrito.destroy();
        return res.json({
            msg: 'Carrito eliminado correctamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al eliminar el carrito',
            error,
        });
    }
};
