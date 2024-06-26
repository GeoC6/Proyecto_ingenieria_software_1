import { Request, Response } from 'express';
import { pagos } from '../models/pagos';
import { Cliente } from '../models/cliente';

// Obtener todos los pagos
export const getAllPagos = async (req: Request, res: Response) => {
  try {
    const allPagos = await pagos.findAll({
      include: [
        { model: Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
      ],
    });
    res.json(allPagos);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar pagos" });
  }
};

// Obtener un pago por su COD
export const getPago = async (req: Request, res: Response) => {
  try {
    const pago = await pagos.findByPk(req.params.id, {
      include: [
        { model: Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
      ],
    });
    if (!pago) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    res.json(pago);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar id de pagos' });
  }
};

// Obtener pagos por COD_CLIENTE
export const getPagosByCliente = async (req: Request, res: Response) => {
  try {
    const { codCliente } = req.params;
    const pagosByCliente = await pagos.findAll({
      where: { COD_CLIENTE: codCliente },
      include: [
        { model: Cliente, attributes: ['NOMBRE', 'APELLIDO'] },
      ],
    });
    res.json(pagosByCliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar pagos del cliente' });
  }
};

// Crear un nuevo pago
export const createPago = async (req: Request, res: Response) => {
  try {
    const { COD_CLIENTE, BUY_ORDER, AMOUNT, STATUS } = req.body;
    const nuevoPago = await pagos.create({ COD_CLIENTE, BUY_ORDER, AMOUNT, STATUS });
    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear pago' });
  }
};

// Actualizar un pago
export const updatePago = async (req: Request, res: Response) => {
  try {
    const pago = await pagos.findByPk(req.params.id);
    if (!pago) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    const { BUY_ORDER, AMOUNT, STATUS } = req.body;
    await pago.update({ BUY_ORDER, AMOUNT, STATUS });
    res.json(pago);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar pago' });
  }
};

// Eliminar un pago
export const deletePago = async (req: Request, res: Response) => {
  try {
    const pago = await pagos.findByPk(req.params.id);
    if (!pago) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    await pago.destroy();
    res.json({ message: 'Pago eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar pago' });
  }
};