import { Request, Response } from 'express';
import { deposito } from '../models/deposito';

// Obtener todos los depósitos
export const getAllDepositos = async (req: Request, res: Response) => {
  try {
    const depositos = await deposito.findAll({
      attributes: ['COD_BANCO', 'NOMBRE_BANCO', 'NUMERO_DE_CUENTA']
    });
    res.json(depositos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los depósitos.' });
  }
};

// Obtener un depósito por su COD
export const getDeposito = async (req: Request, res: Response) => {
  const { cod_banco } = req.params;
  try {
    const depositoEncontrado = await deposito.findByPk(cod_banco, {
      attributes: ['COD_BANCO', 'NOMBRE_BANCO', 'NUMERO_DE_CUENTA']
    });
    if (depositoEncontrado) {
      res.json(depositoEncontrado);
    } else {
      res.status(404).json({ error: 'Depósito no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el depósito.' });
  }
};

// Crear un nuevo depósito
export const createDeposito = async (req: Request, res: Response) => {
  const { COD_BANCO, NOMBRE_BANCO, NUMERO_DE_CUENTA } = req.body;
  try {
    const nuevoDeposito = await deposito.create({ COD_BANCO, NOMBRE_BANCO, NUMERO_DE_CUENTA });
    res.status(201).json(nuevoDeposito);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear el depósito.' });
  }
};

// Actualizar un depósito
export const updateDeposito = async (req: Request, res: Response) => {
  const { cod_banco } = req.params;
  const { NOMBRE_BANCO, NUMERO_DE_CUENTA } = req.body;
  try {
    const depositoEncontrado = await deposito.findByPk(cod_banco);
    if (depositoEncontrado) {
      await depositoEncontrado.update({ NOMBRE_BANCO, NUMERO_DE_CUENTA });
      res.json(depositoEncontrado);
    } else {
      res.status(404).json({ error: 'Depósito no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el depósito.' });
  }
};

// Eliminar un depósito
export const deleteDeposito = async (req: Request, res: Response) => {
  const { cod_banco } = req.params;
  try {
    const depositoEncontrado = await deposito.findByPk(cod_banco);
    if (depositoEncontrado) {
      await depositoEncontrado.destroy();
      res.json({ mensaje: 'Depósito eliminado correctamente.' });
    } else {
      res.status(404).json({ error: 'Depósito no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el depósito.' });
  }
};
