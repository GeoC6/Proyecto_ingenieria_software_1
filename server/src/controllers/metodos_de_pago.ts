import { Request, Response } from 'express';
import { metodos_de_pago } from '../models/metodos_de_pago';

// Obtener todos los métodos de pago
export const getAllMetodos = async (req: Request, res: Response) => {
  try {
    const metodos = await metodos_de_pago.findAll({
      attributes: ['COD_METODO_DE_PAGO', 'TIPO', 'DETALLE']
    });
    res.json(metodos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los métodos de pago.' });
  }
};

// Obtener un método de pago por su COD
export const getMetodo = async (req: Request, res: Response) => {
  const { cod_metodo_de_pago } = req.params;
  try {
    const metodo = await metodos_de_pago.findByPk(cod_metodo_de_pago, {
      attributes: ['COD_METODO_DE_PAGO', 'TIPO', 'DETALLE']
    });
    if (metodo) {
      res.json(metodo);
    } else {
      res.status(404).json({ error: 'Método de pago no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el método de pago.' });
  }
};

// Crear un nuevo método de pago
export const createMetodo = async (req: Request, res: Response) => {
  const { TIPO, DETALLE } = req.body;
  try {
    const nuevoMetodo = await metodos_de_pago.create({ TIPO, DETALLE });
    res.status(201).json(nuevoMetodo);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear el método de pago.' });
  }
};

// Actualizar un método de pago
export const updateMetodo = async (req: Request, res: Response) => {
  const { cod_metodo_de_pago } = req.params;
  const { TIPO, DETALLE } = req.body;
  try {
    const metodo = await metodos_de_pago.findByPk(cod_metodo_de_pago);
    if (metodo) {
      await metodo.update({ TIPO, DETALLE });
      res.json(metodo);
    } else {
      res.status(404).json({ error: 'Método de pago no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el método de pago.' });
  }
};

// Eliminar un método de pago
export const deleteMetodo = async (req: Request, res: Response) => {
  const { cod_metodo_de_pago } = req.params;
  try {
    const metodo = await metodos_de_pago.findByPk(cod_metodo_de_pago);
    if (metodo) {
      await metodo.destroy();
      res.json({ mensaje: 'Método de pago eliminado correctamente.' });
    } else {
      res.status(404).json({ error: 'Método de pago no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el método de pago.' });
  }
};