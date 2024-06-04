import { Request, Response, NextFunction} from 'express';
import { Producto } from '../models/producto';


export const getProductos = async (req: Request, res: Response) => {
    try {
    const listProductos = await Producto.findAll();
    res.json(listProductos);
}catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos.'});
    }
};


export const newProducto = async (req: Request, res: Response) => {
    const { nombre_producto, precio, cantidad_total, cantidad_disponible} = req.body;
    const imagen = req.file ? req.file.path : null;
    try {
        await Producto.create({
            NOMBRE_PRODUCTO: nombre_producto,
            PRECIO_PRODUCTO: precio,
            CANTIDAD_TOTAL: cantidad_total,
            CANTIDAD_DISPONIBLE: cantidad_disponible,
            IMAGEN: imagen// Nueva columna para la ruta de la imagen
        });
        return res.status(201).json({
            msg: 'Producto creado correctamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al crear el producto',
            error
    })
}
};


export const updateProducto = async (req: Request, res: Response) => {
    const { cod_producto } = req.params;
    const idProducto = await Producto.findOne({ where: { COD_PRODUCTO: cod_producto } })
    if (!idProducto) {
        return res.status(404).json({
            msg: "El id del producto no existe"
        })
    }
    try {
        const { nombre_producto, precio, cantidad_total, cantidad_disponible, imagen } = req.body;
        await Producto.update({
            NOMBRE_PRODUCTO: nombre_producto,
            PRECIO_PRODUCTO: precio,
            CANTIDAD_TOTAL: cantidad_total,
            CANTIDAD_DISPONIBLE: cantidad_disponible,
            IMAGEN: imagen
        },
            { where: { COD_PRODUCTO: cod_producto } }
        )
        return res.json({
            msg: 'Producto ' + cod_producto + ' actualizado correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el producto: ' + cod_producto,
            error
        })

    }
}
export const getProducto = async (req: Request, res: Response) => {
    const { cod_producto } = req.params;
    const idProducto = await Producto.findOne({ where: { COD_PRODUCTO: cod_producto } })
    if (!idProducto) {
        return res.status(404).json({
            msg: "El id: " + cod_producto + " de producto no existe"
        })
    }
    try {

        return res.json(idProducto)

    } catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el producto: ' + cod_producto,
            error
        })

    }
}
export const deleteProducto = async (req: Request, res: Response) => {
    const { cod_producto } = req.params;
    const idProducto = await Producto.findOne({ where: { COD_PRODUCTO: cod_producto } })
    if (!idProducto) {
        return res.status(404).json({
            msg: "El id: " + cod_producto + " de producto no existe"
        })
    }
    try {
        await Producto.destroy({ where: { COD_PRODUCTO: cod_producto } }
        )
        return res.json({
            msg: 'Producto de id ' + cod_producto + ' borrado correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el producto: ' + cod_producto,
            error
        })

    }
}

export const agregarProductos = async (req: Request, res: Response) => {
    const { cod_producto } = req.params;
    const { cantidad} = req.body;

    // Verificar si el producto existe
    const idProducto = await Producto.findOne({ where: { COD_PRODUCTO: cod_producto } })
    if (!idProducto) {
        return res.status(404).json({
            msg: "El producto ingresado no existe"
        });
    }

    try {
        const cantidadInt = parseInt(cantidad, 10);

        const cantidades = await Producto.findOne({ attributes: ['CANTIDAD_DISPONIBLE', 'CANTIDAD_TOTAL'], where: { COD_PRODUCTO: cod_producto } });
        const cantidadDisponible = cantidades?.dataValues.CANTIDAD_DISPONIBLE + cantidadInt;
        const cantidadTotal = cantidades?.dataValues.CANTIDAD_TOTAL;

        if (cantidadDisponible > cantidadTotal) {
            return res.status(400).json({
                msg: 'Has superado la máxima capacidad de Stock',
            });
        }

        // Actualizar la cantidad disponible
        await Producto.update({
            CANTIDAD_DISPONIBLE: cantidadDisponible,
        },
            { where: { COD_PRODUCTO: cod_producto } }
        );
        return res.json({
            msg: `Se han añadido ${cantidad} de productos`
        });

    } catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al añadir los productos',
            error
        });
    }
};

export const uploadImagen = async (req: Request, res: Response, next: NextFunction) => {
    const { cod_producto } = req.params;
    const imagen_url = req.file ? req.file.path : null;
  
    try {
  
      const producto = await Producto.findOne({where: {cod_producto}});
  
      if (!producto) {
        return res.status(404).json({ msg: 'Producto no encontrado' });

      }
      
      await Producto.update({
        IMAGEN: imagen_url
      },{where: {COD_PRODUCTO:cod_producto}})
  
      return res.json({ msg: 'Imagen del producto actualizada correctamente' });

    } catch (error) {
      console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la imagen del producto',
            error });
    }
}
