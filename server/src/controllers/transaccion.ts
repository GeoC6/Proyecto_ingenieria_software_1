import { Request, Response } from 'express';
import { transaccion } from '../models/transaccion';
import { pagos } from '../models/pagos';

// Obtener todas las transacciones
export const getAllTransacciones = async (req: Request, res: Response) => {
  try {
    const transacciones = await transaccion.findAll({
      include: [
        { model: pagos, attributes: ['COD_PAGO'] },
      ],
      attributes: ['COD_TRANSACCION', 'COD_PAGO', 'FECHA_PAGO', 'ESTADO_TRANSACCION']
    });
    res.json(transacciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las transacciones.' });
  }
};

// Obtener una transacción por su COD
export const getTransaccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const transaccionEncontrada = await transaccion.findByPk(id, {
      include: [
        { model: pagos, attributes: ['COD_PAGO'] },
      ],
      attributes: ['COD_TRANSACCION', 'COD_PAGO', 'FECHA_PAGO', 'ESTADO_TRANSACCION']
    });
    if (!transaccionEncontrada) {
      return res.status(404).json({ error: 'Transacción no encontrada.' });
    }
    res.json(transaccionEncontrada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la transacción.' });
  }
};

// Crear una nueva transacción
export const createTransaccion = async (req: Request, res: Response) => {
  const { COD_PAGO } = req.body;
  try {
    const nuevaTransaccion = await transaccion.create({ COD_PAGO });
    res.status(201).json(nuevaTransaccion);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear la transacción.' });
  }
};

// Actualizar una transacción
export const updateTransaccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ESTADO_TRANSACCION } = req.body;
  try {
    const transaccionEncontrada = await transaccion.findByPk(id);
    if (!transaccionEncontrada) {
      return res.status(404).json({ error: 'Transacción no encontrada.' });
    }
    await transaccionEncontrada.update({ ESTADO_TRANSACCION });
    res.json(transaccionEncontrada);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar la transacción.' });
  }
};

// Eliminar una transacción
export const deleteTransaccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const transaccionEncontrada = await transaccion.findByPk(id);
    if (!transaccionEncontrada) {
      return res.status(404).json({ error: 'Transacción no encontrada.' });
    }
    await transaccionEncontrada.destroy();
    res.json({ mensaje: 'Transacción eliminada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la transacción.' });
  }
};
