import { Request, Response, NextFunction } from 'express'
import { Producto } from '../models/producto'
import { transbank } from '../models/transbank'

export const getProducts = async (req: Request, res: Response) => {
  try {
    const listProductos = await Producto.findAll()
    res.json(listProductos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los productos.' })
  }
}

export const getTransaction = async (req: Request, res: Response) => {
  const { CODE } = req.body

  try {
    const getTransaction = await transbank.findOne({ where: { CODE: CODE } })
    res.json(getTransaction)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los productos.' })
  }
}
