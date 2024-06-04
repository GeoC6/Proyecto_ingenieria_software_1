import { Request, Response } from 'express';
import { pagos } from '../models/pagos';
import { Facturas } from '../models/facturas'; // Se importa el modelo de facturas
import { metodos_de_pago } from '../models/metodos_de_pago';
import { deposito } from '../models/deposito';

// Obtener todos los pagos
export const getAllPagos = async (req: Request, res: Response) => {
  try {
    const allPagos = await pagos.findAll({
      include: [
        { model: Facturas, attributes: ['COD_FACTURA'] }, // Se corrige el nombre del modelo a Facturas
        { model: metodos_de_pago, attributes: ['TIPO', 'DETALLE'] },
        { model: deposito, attributes: ['NOMBRE_BANCO', 'NUMERO_DE_CUENTA'] },
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
        { model: Facturas, attributes: ['COD_FACTURA'] }, // Se corrige el nombre del modelo a Facturas
        { model: metodos_de_pago, attributes: ['TIPO', 'DETALLE'] },
        { model: deposito, attributes: ['NOMBRE_BANCO', 'NUMERO_DE_CUENTA'] },
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

// Crear un nuevo pago
export const createPago = async (req: Request, res: Response) => {
  try {
    const { COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO } = req.body;
    const nuevoPago = await pagos.create({ COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO });
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
    const { COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO } = req.body;
    await pago.update({ COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO });
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