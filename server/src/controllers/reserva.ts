import { Request, Response } from "express";
import { Reserva } from "../models/reserva";
import { DetalleReserva } from '../models/detalle_reserva';
import { Producto } from "../models/producto";
import sequelize from "sequelize";
import { Op } from "sequelize";
import { endOfMonth,endOfYear,parseISO,startOfMonth, startOfYear, subMonths  } from 'date-fns';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';



export const newReserva = async (req: Request, res: Response) => {
    const {
        celular_cliente,
        nombre_cliente,
        apellido_cliente,
        direccion_cliente,
        ciudad_cliente,
        CANTIDAD,
        COD_PRODUCTO
    } = req.body;

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];

    try {

        const reserva = await Reserva.create({
            CELULAR_CLIENTE: celular_cliente,
            NOMBRE_CLIENTE: nombre_cliente,
            APELLIDO_CLIENTE: apellido_cliente,
            DIRECCION_CLIENTE: direccion_cliente,
            CIUDAD_CLIENTE: ciudad_cliente,
            FECHA_CREACION: fechaFormateada,
            ESTADO: 'Pendiente',
            TOTAL: 0,
        });
        

        const pkReserva = reserva.dataValues.COD_RESERVA
        
        for (const [index,producto] of COD_PRODUCTO.entries()){
            const cantidad = CANTIDAD[index]
            const cantidadInt = parseInt(cantidad, 10);
            const productoInt = parseInt(producto, 10);

            if (cantidadInt > 0 || cantidadInt){
                const idProducto = await Producto.findOne({ attributes: ['PRECIO_PRODUCTO','CANTIDAD_DISPONIBLE','CANTIDAD_TOTAL'] , where:{ COD_PRODUCTO: productoInt}});
                if (!idProducto) {
                    return res.status(400).json({
                    msg: "El producto ingresado no existe",
                    })
                }
                const cantidadDisponible = idProducto?.dataValues.CANTIDAD_DISPONIBLE - cantidadInt
                if (cantidadDisponible < 0) {
                    return res.status(400).json({
                    msg: 'No hay Stock suficiente',
                    })
                }
                const precioProducto = idProducto?.dataValues.PRECIO_PRODUCTO;
                const subTotal = precioProducto * cantidadInt
                const idReserva = await Reserva.findOne({attributes: ['TOTAL'],where: {COD_RESERVA: pkReserva}})
                const total = idReserva?.dataValues.TOTAL


                try {
                    await DetalleReserva.create({
                        COD_RESERVA: pkReserva,
                        COD_PRODUCTO: productoInt,
                        CANTIDAD: cantidadInt,
                        SUBTOTAL: subTotal
                    });
                    await Reserva.update({
                        TOTAL: total + subTotal
                        },
                        {where:{ COD_RESERVA: pkReserva } 
                    });
                    await Producto.update({
                        CANTIDAD_DISPONIBLE: cantidadDisponible
                    },
                        { where: { COD_PRODUCTO: productoInt } 
                    })
                } catch (innerError){
                    res.status(400).json({
                        msg: "Ha ocurrido un error al hacer el pedido",
                        innerError
                    })
                }
            }

        }
        res.status(201).json({
            msg: 'Pedido realizado correctamente',
            reserva
        })
    }catch (outterError) {
        res.status(400).json({
            msg: "Ha ocurrido un error al hacer el pedido",
            outterError
        })
    }
    };

export const getReserva = async (req: Request, res: Response) => {
    const { cod_reserva } = req.params;

    try {
        const reserva = await Reserva.findByPk(cod_reserva);

        if (!reserva) {
            return res.status(404).json({
                msg: 'La reserva no existe',
            });
        }

        res.json(reserva);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener la reserva',
            error
        });
    }
};

export const getReservas = async (req: Request, res: Response) => {
    try {
        const listReservas = await Reserva.findAll();
        res.json(listReservas);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener las reservas',
            error
        });
    }
};

export const getReservasByEstado = async (req: Request, res: Response) => {
    const { estado } = req.params;

    try {
        const listReservas = await Reserva.findAll({
            where: {
                ESTADO: estado,
            },
        });

        res.json(listReservas);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener las reservas por estado',
            error,
        });
    }
};

export const getReservasByCiudad = async (req: Request, res: Response) => {
    const { ciudad } = req.params;

    try {
        const listReservas = await Reserva.findAll({
            where: {
                CIUDAD_CLIENTE: ciudad,
            },
        });

        res.json(listReservas);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener las reservas por ciudad',
            error,
        });
    }
};

export const updateReserva = async (req: Request, res: Response) => {
    const { cod_reserva } = req.params;
    const { CELULAR_CLIENTE, NOMBRE_CLIENTE, APELLIDO_CLIENTE, DIRECCION_CLIENTE, CIUDAD_CLIENTE, ESTADO } = req.body;

    try {
        const reserva = await Reserva.findByPk(cod_reserva);

        if (!reserva) {
            return res.status(404).json({
                msg: 'La reserva no existe',
            });
        }

        await reserva.update({
            CELULAR_CLIENTE,
            NOMBRE_CLIENTE,
            APELLIDO_CLIENTE,
            DIRECCION_CLIENTE,
            CIUDAD_CLIENTE,
            ESTADO
        });

        res.json({
            msg: 'Reserva actualizada correctamente',
            reserva,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la informacion de la reserva',
            error
        });
        
    }
};

export const deleteReserva = async (req: Request, res: Response) => {
    const { cod_reserva } = req.params;

    try {
        const reserva = await Reserva.findByPk(cod_reserva);

        if (!reserva) {
            return res.status(404).json({
                msg: 'La reserva no existe',
            });
        }

        await reserva.destroy();

        res.json({
            msg: 'Reserva eliminada correctamente',
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al eliminar la reserva',
            error
        });
        
    }
};

export const getMasVendido = async (req: Request, res: Response) => {

    const {fecha_inicio, fecha_final} = req.body;

    const productos = await DetalleReserva.findAll({attributes: [[sequelize.col('Producto.NOMBRE_PRODUCTO'), 'NOMBRE_PRODUCTO'], 'CANTIDAD'],
        include: [
          {
            model: Reserva,
            where: {
              FECHA_CREACION: {
                [Op.between]: [fecha_inicio,fecha_final],
              },
            },
          },
          {
            model: Producto,
            attributes: [],
          },
        ],
        
      });

    if(!productos || productos.length == 0){
        res.status(400).json({
            msg:'No se han encontrado reservas en ese periodo de tiempo',
        })
    }
    const productosPorNombre: Map<string, number[]> = new Map();

    for (const producto of productos) {
        const nombreProducto = producto.getDataValue('NOMBRE_PRODUCTO');
        const cantidad = producto.getDataValue('CANTIDAD');
        if (productosPorNombre.has(nombreProducto)) {
            productosPorNombre.get(nombreProducto)!.push(cantidad);
        } else {
            productosPorNombre.set(nombreProducto, [cantidad]);
        }
    }
    try {
        if (productosPorNombre.size > 0) {
            let nombreProductoMayorCantidad = '';
            let cantidadMayor = 0;
    
            for (const [nombreProducto, cantidades] of productosPorNombre) {
                const totalCantidad = cantidades.reduce((acc, curr) => acc + curr, 0);
                if (totalCantidad > cantidadMayor) {
                    nombreProductoMayorCantidad = nombreProducto;
                    cantidadMayor = totalCantidad;
                }
            }
            const idProducto = await Producto.findOne({ where: { NOMBRE_PRODUCTO: nombreProductoMayorCantidad } });
            res.json({
                idProducto,
                cantidadMayor
            });
        }
    }catch(error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener el reporte',
            error
        })

    }

}

export const getVentasPorMes = async (req: Request, res: Response) => {

    const { ano_reporte} = req.body;


    console.log( ano_reporte)


    


    const fecha = new Date(ano_reporte)
    const fechaInicio = startOfYear(fecha);
    const fechaFin = endOfYear(fecha);

    const fechaInicioAno = fechaInicio.toISOString().split('T')[0];
    const fechaFinAno = fechaFin.toISOString().split('T')[0];





    const reservas = await Reserva.findAll({
        attributes: [
            'TOTAL',
            'FECHA_CREACION'
        ],
        where: {
            FECHA_CREACION: {
                [Op.gte]: [fechaInicioAno],
                [Op.lt]: [fechaFinAno]
            },
            ESTADO: {[Op.not]: ['Cancelada']}
        }
    });
    if (!reservas || reservas.length == 0){
        return res.json({
            msg: 'No hay reservas en este año'
        })
    }
    try{
        const reservasPorMes: Map<number, { cantidad: number, total: number }> = new Map();

        for (const reserva of reservas) {
            const fechaReserva = reserva.getDataValue('FECHA_CREACION');
            const mesReserva = parseInt(fechaReserva.slice(5, 7), 10);
            const total = reserva.getDataValue('TOTAL');

            if (reservasPorMes.has(mesReserva)) {
                const infoMes = reservasPorMes.get(mesReserva)!;
                infoMes.cantidad++;
                infoMes.total += total;
            } else {
                reservasPorMes.set(mesReserva, { cantidad: 1, total: total });
            }
        }
        const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
        const meses = Array.from({ length: 12 }, (_, index) => index + 1);
        const ventasPorMesArray = meses.map(mes => ({
            mes: nombresMeses[mes -1] ,
            cantidadVentas: reservasPorMes.get(mes)?.cantidad || 0,
            totalDinero: reservasPorMes.get(mes)?.total || 0,
        }));

        res.json(ventasPorMesArray);
        
        }catch(error){
            res.status(400).json({
                msg: 'Ha ocurrido un error al obtener el reporte',
                error
            })
        }
};
export const getDiaMasVendido = async (req: Request, res: Response) => {

    try{
    const fechaActual = new Date();
    const fechaInicioMes = subMonths(startOfMonth(fechaActual),1);
    const fechaFinMes = subMonths(endOfMonth(fechaActual),1);
    
    fechaInicioMes.toISOString().split('T')[0];
    fechaFinMes.toISOString().split('T')[0];
    
    const reservas = await Reserva.findAll({where:{FECHA_CREACION: {
        [Op.between]:[fechaInicioMes ,fechaFinMes]
        }
        }
    })
    const reservasPorDia: Map<number, { cantidad: number}> = new Map();
    
    for (const reserva of reservas){
        const fechaReserva =parseISO(reserva.getDataValue('FECHA_CREACION'))
        const numeroDiaSemana = fechaReserva.getDay();
        


        if (reservasPorDia.has(numeroDiaSemana)) {
            const infoDia = reservasPorDia.get(numeroDiaSemana)!;
            infoDia.cantidad++;;
        } else {
            reservasPorDia.set(numeroDiaSemana, { cantidad: 1});
        }
    }
    const nombresDiasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    // console.log(reservasPorDia.get('Domingo')?.cantidad)
    const dias = Array.from({ length: 7 }, (_, index) => index );
        const ventasDia = dias.map(dia => ({
            dia: nombresDiasSemana[dia],
            cantidadVentas: reservasPorDia.get(dia)?.cantidad || 0,
        }));

    res.json(ventasDia)
    } catch(error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener el reporte',
            error
        })
    }
    }

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
  interface TDocumentDefinitions {
    content: any[]
    styles: Record<string,any>;
  }

  export const pdfReserva = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).send('Rerserva no encontrada');
      }
      const detallereserva = await DetalleReserva.findAll({attributes: [[sequelize.col('Producto.NOMBRE_PRODUCTO'), 'NOMBRE_PRODUCTO'], 'CANTIDAD',[sequelize.col('Producto.PRECIO_PRODUCTO'), 'PRECIO_PRODUCTO']],
      include: [
        {
          model: Producto,
          attributes: [],
        }
      ],where: {COD_RESERVA: id},
      
    });

      const documentDefinition: TDocumentDefinitions = {
        content: [
          { text: 'Distribuidora Aqua Pura' , style: 'header' },
          { text: '\nDetalles de la Reserva:\n\n', style: 'subheader' },
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*'],
              body: [
                ['Codigo Reserva', reserva.dataValues.COD_RESERVA],
                ['Fecha de reserva', reserva.dataValues.FECHA_CREACION],
                ['Nombre Completo', `${reserva.dataValues.NOMBRE_CLIENTE} ${reserva.dataValues.APELLIDO_CLIENTE}`],
                ['Celular', reserva.dataValues.CELULAR_CLIENTE],
                ['Direccion', reserva.dataValues.DIRECCION_CLIENTE],
                ['Ciudad', reserva.dataValues.CIUDAD_CLIENTE],

              ],
            },
          },
          // Agregar espacio en blanco
          { text: '\n\n' },
          // Agregar la subtabla
          {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto','auto'],
              body: [
                ['Producto', 'Precio','Cantidad'],
                ...detallereserva.map(detalle => [
                  detalle.getDataValue('NOMBRE_PRODUCTO'),
                  detalle.getDataValue('PRECIO_PRODUCTO'),
                  detalle.getDataValue('CANTIDAD'),
                ]),
                ['' ,'' ,''],
                ['Total: ',' ',reserva.dataValues.TOTAL]
              ],
            },
            layout: 'lightHorizontalLines',
          },
        ],
        styles: {
          header: {
            fontSize: 16,
            bold: true,
            alignment: 'center',
          },
          subheader: {
            fontSize: 14,
            bold: true,
          },
        },
      };

      const pdfDoc = pdfMake.createPdf(documentDefinition);

      // Enviar el PDF como respuesta
      pdfDoc.getBuffer((result: Buffer) => {
        try {
            res.attachment(`Reserva_${id}.pdf`);
            res.type('application/pdf');
            res.end(result, 'binary');
        } catch (error) {
          console.error('Error procesando imagen', error);
          res.status(500).send('Error proceso de imagen');
        }
      });
    } catch (error) {
      console.error('Error al generar el PDF',error);
      res.status(500).send('Error interno del servidor');
    }
  };

  export const comprobarEstadoReserva = async () => {
    try {
        const reservas = await Reserva.findAll();
    
        for (const reserva of reservas) {
          const codigoReserva = reserva.getDataValue('COD_RESERVA');
          const estadoReserva = reserva.getDataValue('ESTADO');
          parseInt(codigoReserva,10)

    
          if( estadoReserva== 'Cancelado' ){
            

            const detalleReservas = await DetalleReserva.findAll({where:{COD_RESERVA: codigoReserva}});
            
            for (const detalleReserva of detalleReservas){

                const codigoProducto = detalleReserva.getDataValue('COD_PRODUCTO');
                const cantidadProducto = detalleReserva.getDataValue('CANTIDAD');

                parseInt(codigoProducto,10)
                parseInt(cantidadProducto,10)

                const producto = await Producto.findOne({attributes: ['CANTIDAD_DISPONIBLE'],where: {COD_PRODUCTO: codigoProducto}})
                const cantidadDisponible = producto?.getDataValue('CANTIDAD_DISPONIBLE')
                parseInt(cantidadDisponible,10)


                await Producto.update({
                    CANTIDAD_DISPONIBLE: cantidadDisponible + cantidadProducto
                },
                {where: {COD_PRODUCTO: codigoProducto}
            })
            }
            await DetalleReserva.destroy({where:{COD_RESERVA: codigoReserva}})
          
        }
      } 
    }catch (error) {
        console.error(error);
      }
  };


