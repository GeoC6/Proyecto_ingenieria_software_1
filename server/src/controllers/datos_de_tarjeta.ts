import { Request, Response } from 'express';
import { datos_de_tarjeta } from '../models/datos_de_tarjeta';

// Obtener todos los datos de tarjeta
export const getAllDatosTarjeta = async (req: Request, res: Response) => {
  try {
    const datosTarjeta = await datos_de_tarjeta.findAll({
      attributes: ['NUMERO', 'FECHA_DE_VENCIMIENTO', 'CVC']
    });
    res.json(datosTarjeta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos de tarjeta.' });
  }
};

// Obtener un dato de tarjeta por su COD
export const getDatoTarjeta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const datoTarjeta = await datos_de_tarjeta.findByPk(id, {
      attributes: ['NUMERO', 'FECHA_DE_VENCIMIENTO', 'CVC']
    });
    if (!datoTarjeta) {
      return res.status(404).json({ error: 'Dato de tarjeta no encontrado.' });
    }
    res.json(datoTarjeta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el dato de tarjeta.' });
  }
};

// Crear un nuevo dato de tarjeta
export const createDatoTarjeta = async (req: Request, res: Response) => {
  const { FECHA_DE_VENCIMIENTO, CVC } = req.body;
  try {
    const nuevoDatoTarjeta = await datos_de_tarjeta.create({ FECHA_DE_VENCIMIENTO, CVC });
    res.status(201).json(nuevoDatoTarjeta);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear el dato de tarjeta.' });
  }
};

// Actualizar un dato de tarjeta
export const updateDatoTarjeta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { FECHA_DE_VENCIMIENTO, CVC } = req.body;
  try {
    const datoTarjeta = await datos_de_tarjeta.findByPk(id);
    if (!datoTarjeta) {
      return res.status(404).json({ error: 'Dato de tarjeta no encontrado.' });
    }
    await datoTarjeta.update({ FECHA_DE_VENCIMIENTO, CVC });
    res.json(datoTarjeta);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar el dato de tarjeta.' });
  }
};

// Eliminar un dato de tarjeta
export const deleteDatoTarjeta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const datoTarjeta = await datos_de_tarjeta.findByPk(id);
    if (!datoTarjeta) {
      return res.status(404).json({ error: 'Dato de tarjeta no encontrado.' });
    }
    await datoTarjeta.destroy();
    res.json({ mensaje: 'Dato de tarjeta eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el dato de tarjeta.' });
  }
};
