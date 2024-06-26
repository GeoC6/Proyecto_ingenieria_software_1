import { Request, Response } from 'express';
import { boleta } from '../models/boleta';
import { pagos } from '../models/pagos';
import { Cliente } from '../models/cliente';

// Obtener todas las boletas
export const getAllBoletas = async (req: Request, res: Response) => {
  try {
    const boletas = await boleta.findAll({
      include: [
        { model: pagos, attributes: ['BUY_ORDER', 'AMOUNT'] },
        { model: Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
      ],
      attributes: ['COD_BOLETA', 'COD_CLIENTE', 'COD_PAGO', 'TRANSACTION_DATE', 'AMOUNT', 'STATUS']
    });
    res.json(boletas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las boletas.' });
  }
};

// Obtener una boleta por su COD
export const getBoleta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const boletaEncontrada = await boleta.findByPk(id, {
      include: [
        { model: pagos, attributes: ['BUY_ORDER', 'AMOUNT'] },
        { model: Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
      ],
      attributes: ['COD_BOLETA', 'COD_CLIENTE', 'COD_PAGO', 'TRANSACTION_DATE', 'AMOUNT', 'STATUS']
    });
    if (!boletaEncontrada) {
      return res.status(404).json({ error: 'Boleta no encontrada.' });
    }
    res.json(boletaEncontrada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la boleta.' });
  }
};

// Obtener boletas por COD_CLIENTE
export const getBoletasByCliente = async (req: Request, res: Response) => {
  const { codCliente } = req.params;
  try {
    const boletas = await boleta.findAll({
      where: { COD_CLIENTE: codCliente },
      include: [
        { model: pagos, attributes: ['BUY_ORDER', 'AMOUNT'] },
        { model: Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
      ],
      attributes: ['COD_BOLETA', 'COD_CLIENTE', 'COD_PAGO', 'TRANSACTION_DATE', 'AMOUNT', 'STATUS']
    });
    res.json(boletas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las boletas del cliente.' });
  }
};

// Crear una nueva boleta
export const createBoleta = async (req: Request, res: Response) => {
  const { COD_CLIENTE, COD_PAGO, AMOUNT, STATUS } = req.body;
  try {
    const nuevaBoleta = await boleta.create({ COD_CLIENTE, COD_PAGO, AMOUNT, STATUS });
    res.status(201).json(nuevaBoleta);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear la boleta.' });
  }
};

// Actualizar una boleta
export const updateBoleta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { AMOUNT, STATUS } = req.body;
  try {
    const boletaEncontrada = await boleta.findByPk(id);
    if (!boletaEncontrada) {
      return res.status(404).json({ error: 'Boleta no encontrada.' });
    }
    await boletaEncontrada.update({ AMOUNT, STATUS });
    res.json(boletaEncontrada);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar la boleta.' });
  }
};

// Eliminar una boleta
export const deleteBoleta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const boletaEncontrada = await boleta.findByPk(id);
    if (!boletaEncontrada) {
      return res.status(404).json({ error: 'Boleta no encontrada.' });
    }
    await boletaEncontrada.destroy();
    res.json({ mensaje: 'Boleta eliminada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la boleta.' });
  }
};