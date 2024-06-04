"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comprobarEstadoReserva = exports.pdfReserva = exports.getDiaMasVendido = exports.getVentasPorMes = exports.getMasVendido = exports.deleteReserva = exports.updateReserva = exports.getReservasByCiudad = exports.getReservasByEstado = exports.getReservas = exports.getReserva = exports.newReserva = void 0;
const reserva_1 = require("../models/reserva");
const detalle_reserva_1 = require("../models/detalle_reserva");
const producto_1 = require("../models/producto");
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = require("sequelize");
const date_fns_1 = require("date-fns");
const pdfmake_1 = __importDefault(require("pdfmake/build/pdfmake"));
const vfs_fonts_1 = __importDefault(require("pdfmake/build/vfs_fonts"));
const newReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { celular_cliente, nombre_cliente, apellido_cliente, direccion_cliente, ciudad_cliente, CANTIDAD, COD_PRODUCTO } = req.body;
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];
    try {
        const reserva = yield reserva_1.Reserva.create({
            CELULAR_CLIENTE: celular_cliente,
            NOMBRE_CLIENTE: nombre_cliente,
            APELLIDO_CLIENTE: apellido_cliente,
            DIRECCION_CLIENTE: direccion_cliente,
            CIUDAD_CLIENTE: ciudad_cliente,
            FECHA_CREACION: fechaFormateada,
            ESTADO: 'Pendiente',
            TOTAL: 0,
        });
        const pkReserva = reserva.dataValues.COD_RESERVA;
        for (const [index, producto] of COD_PRODUCTO.entries()) {
            const cantidad = CANTIDAD[index];
            const cantidadInt = parseInt(cantidad, 10);
            const productoInt = parseInt(producto, 10);
            if (cantidadInt > 0 || cantidadInt) {
                const idProducto = yield producto_1.Producto.findOne({ attributes: ['PRECIO_PRODUCTO', 'CANTIDAD_DISPONIBLE', 'CANTIDAD_TOTAL'], where: { COD_PRODUCTO: productoInt } });
                if (!idProducto) {
                    return res.status(400).json({
                        msg: "El producto ingresado no existe",
                    });
                }
                const cantidadDisponible = (idProducto === null || idProducto === void 0 ? void 0 : idProducto.dataValues.CANTIDAD_DISPONIBLE) - cantidadInt;
                if (cantidadDisponible < 0) {
                    return res.status(400).json({
                        msg: 'No hay Stock suficiente',
                    });
                }
                const precioProducto = idProducto === null || idProducto === void 0 ? void 0 : idProducto.dataValues.PRECIO_PRODUCTO;
                const subTotal = precioProducto * cantidadInt;
                const idReserva = yield reserva_1.Reserva.findOne({ attributes: ['TOTAL'], where: { COD_RESERVA: pkReserva } });
                const total = idReserva === null || idReserva === void 0 ? void 0 : idReserva.dataValues.TOTAL;
                try {
                    yield detalle_reserva_1.DetalleReserva.create({
                        COD_RESERVA: pkReserva,
                        COD_PRODUCTO: productoInt,
                        CANTIDAD: cantidadInt,
                        SUBTOTAL: subTotal
                    });
                    yield reserva_1.Reserva.update({
                        TOTAL: total + subTotal
                    }, { where: { COD_RESERVA: pkReserva }
                    });
                    yield producto_1.Producto.update({
                        CANTIDAD_DISPONIBLE: cantidadDisponible
                    }, { where: { COD_PRODUCTO: productoInt }
                    });
                }
                catch (innerError) {
                    res.status(400).json({
                        msg: "Ha ocurrido un error al hacer el pedido",
                        innerError
                    });
                }
            }
        }
        res.status(201).json({
            msg: 'Pedido realizado correctamente',
            reserva
        });
    }
    catch (outterError) {
        res.status(400).json({
            msg: "Ha ocurrido un error al hacer el pedido",
            outterError
        });
    }
});
exports.newReserva = newReserva;
const getReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_reserva } = req.params;
    try {
        const reserva = yield reserva_1.Reserva.findByPk(cod_reserva);
        if (!reserva) {
            return res.status(404).json({
                msg: 'La reserva no existe',
            });
        }
        res.json(reserva);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener la reserva',
            error
        });
    }
});
exports.getReserva = getReserva;
const getReservas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listReservas = yield reserva_1.Reserva.findAll();
        res.json(listReservas);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener las reservas',
            error
        });
    }
});
exports.getReservas = getReservas;
const getReservasByEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estado } = req.params;
    try {
        const listReservas = yield reserva_1.Reserva.findAll({
            where: {
                ESTADO: estado,
            },
        });
        res.json(listReservas);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener las reservas por estado',
            error,
        });
    }
});
exports.getReservasByEstado = getReservasByEstado;
const getReservasByCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciudad } = req.params;
    try {
        const listReservas = yield reserva_1.Reserva.findAll({
            where: {
                CIUDAD_CLIENTE: ciudad,
            },
        });
        res.json(listReservas);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener las reservas por ciudad',
            error,
        });
    }
});
exports.getReservasByCiudad = getReservasByCiudad;
const updateReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_reserva } = req.params;
    const { CELULAR_CLIENTE, NOMBRE_CLIENTE, APELLIDO_CLIENTE, DIRECCION_CLIENTE, CIUDAD_CLIENTE, ESTADO } = req.body;
    try {
        const reserva = yield reserva_1.Reserva.findByPk(cod_reserva);
        if (!reserva) {
            return res.status(404).json({
                msg: 'La reserva no existe',
            });
        }
        yield reserva.update({
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
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la informacion de la reserva',
            error
        });
    }
});
exports.updateReserva = updateReserva;
const deleteReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_reserva } = req.params;
    try {
        const reserva = yield reserva_1.Reserva.findByPk(cod_reserva);
        if (!reserva) {
            return res.status(404).json({
                msg: 'La reserva no existe',
            });
        }
        yield reserva.destroy();
        res.json({
            msg: 'Reserva eliminada correctamente',
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al eliminar la reserva',
            error
        });
    }
});
exports.deleteReserva = deleteReserva;
const getMasVendido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha_inicio, fecha_final } = req.body;
    const productos = yield detalle_reserva_1.DetalleReserva.findAll({ attributes: [[sequelize_1.default.col('Producto.NOMBRE_PRODUCTO'), 'NOMBRE_PRODUCTO'], 'CANTIDAD'],
        include: [
            {
                model: reserva_1.Reserva,
                where: {
                    FECHA_CREACION: {
                        [sequelize_2.Op.between]: [fecha_inicio, fecha_final],
                    },
                },
            },
            {
                model: producto_1.Producto,
                attributes: [],
            },
        ],
    });
    if (!productos || productos.length == 0) {
        res.status(400).json({
            msg: 'No se han encontrado reservas en ese periodo de tiempo',
        });
    }
    const productosPorNombre = new Map();
    for (const producto of productos) {
        const nombreProducto = producto.getDataValue('NOMBRE_PRODUCTO');
        const cantidad = producto.getDataValue('CANTIDAD');
        if (productosPorNombre.has(nombreProducto)) {
            productosPorNombre.get(nombreProducto).push(cantidad);
        }
        else {
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
            const idProducto = yield producto_1.Producto.findOne({ where: { NOMBRE_PRODUCTO: nombreProductoMayorCantidad } });
            res.json({
                idProducto,
                cantidadMayor
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener el reporte',
            error
        });
    }
});
exports.getMasVendido = getMasVendido;
const getVentasPorMes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ano_reporte } = req.body;
    console.log(ano_reporte);
    const fecha = new Date(ano_reporte);
    const fechaInicio = (0, date_fns_1.startOfYear)(fecha);
    const fechaFin = (0, date_fns_1.endOfYear)(fecha);
    const fechaInicioAno = fechaInicio.toISOString().split('T')[0];
    const fechaFinAno = fechaFin.toISOString().split('T')[0];
    const reservas = yield reserva_1.Reserva.findAll({
        attributes: [
            'TOTAL',
            'FECHA_CREACION'
        ],
        where: {
            FECHA_CREACION: {
                [sequelize_2.Op.gte]: [fechaInicioAno],
                [sequelize_2.Op.lt]: [fechaFinAno]
            },
            ESTADO: { [sequelize_2.Op.not]: ['Cancelada'] }
        }
    });
    if (!reservas || reservas.length == 0) {
        return res.json({
            msg: 'No hay reservas en este año'
        });
    }
    try {
        const reservasPorMes = new Map();
        for (const reserva of reservas) {
            const fechaReserva = reserva.getDataValue('FECHA_CREACION');
            const mesReserva = parseInt(fechaReserva.slice(5, 7), 10);
            const total = reserva.getDataValue('TOTAL');
            if (reservasPorMes.has(mesReserva)) {
                const infoMes = reservasPorMes.get(mesReserva);
                infoMes.cantidad++;
                infoMes.total += total;
            }
            else {
                reservasPorMes.set(mesReserva, { cantidad: 1, total: total });
            }
        }
        const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const meses = Array.from({ length: 12 }, (_, index) => index + 1);
        const ventasPorMesArray = meses.map(mes => {
            var _a, _b;
            return ({
                mes: nombresMeses[mes - 1],
                cantidadVentas: ((_a = reservasPorMes.get(mes)) === null || _a === void 0 ? void 0 : _a.cantidad) || 0,
                totalDinero: ((_b = reservasPorMes.get(mes)) === null || _b === void 0 ? void 0 : _b.total) || 0,
            });
        });
        res.json(ventasPorMesArray);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener el reporte',
            error
        });
    }
});
exports.getVentasPorMes = getVentasPorMes;
const getDiaMasVendido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fechaActual = new Date();
        const fechaInicioMes = (0, date_fns_1.subMonths)((0, date_fns_1.startOfMonth)(fechaActual), 1);
        const fechaFinMes = (0, date_fns_1.subMonths)((0, date_fns_1.endOfMonth)(fechaActual), 1);
        fechaInicioMes.toISOString().split('T')[0];
        fechaFinMes.toISOString().split('T')[0];
        const reservas = yield reserva_1.Reserva.findAll({ where: { FECHA_CREACION: {
                    [sequelize_2.Op.between]: [fechaInicioMes, fechaFinMes]
                }
            }
        });
        const reservasPorDia = new Map();
        for (const reserva of reservas) {
            const fechaReserva = (0, date_fns_1.parseISO)(reserva.getDataValue('FECHA_CREACION'));
            const numeroDiaSemana = fechaReserva.getDay();
            if (reservasPorDia.has(numeroDiaSemana)) {
                const infoDia = reservasPorDia.get(numeroDiaSemana);
                infoDia.cantidad++;
                ;
            }
            else {
                reservasPorDia.set(numeroDiaSemana, { cantidad: 1 });
            }
        }
        const nombresDiasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        // console.log(reservasPorDia.get('Domingo')?.cantidad)
        const dias = Array.from({ length: 7 }, (_, index) => index);
        const ventasDia = dias.map(dia => {
            var _a;
            return ({
                dia: nombresDiasSemana[dia],
                cantidadVentas: ((_a = reservasPorDia.get(dia)) === null || _a === void 0 ? void 0 : _a.cantidad) || 0,
            });
        });
        res.json(ventasDia);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener el reporte',
            error
        });
    }
});
exports.getDiaMasVendido = getDiaMasVendido;
pdfmake_1.default.vfs = vfs_fonts_1.default.pdfMake.vfs;
const pdfReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reserva = yield reserva_1.Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).send('Rerserva no encontrada');
        }
        const detallereserva = yield detalle_reserva_1.DetalleReserva.findAll({ attributes: [[sequelize_1.default.col('Producto.NOMBRE_PRODUCTO'), 'NOMBRE_PRODUCTO'], 'CANTIDAD', [sequelize_1.default.col('Producto.PRECIO_PRODUCTO'), 'PRECIO_PRODUCTO']],
            include: [
                {
                    model: producto_1.Producto,
                    attributes: [],
                }
            ], where: { COD_RESERVA: id },
        });
        const documentDefinition = {
            content: [
                { text: 'Distribuidora Aqua Pura', style: 'header' },
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
                        widths: ['auto', 'auto', 'auto'],
                        body: [
                            ['Producto', 'Precio', 'Cantidad'],
                            ...detallereserva.map(detalle => [
                                detalle.getDataValue('NOMBRE_PRODUCTO'),
                                detalle.getDataValue('PRECIO_PRODUCTO'),
                                detalle.getDataValue('CANTIDAD'),
                            ]),
                            ['', '', ''],
                            ['Total: ', ' ', reserva.dataValues.TOTAL]
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
        const pdfDoc = pdfmake_1.default.createPdf(documentDefinition);
        // Enviar el PDF como respuesta
        pdfDoc.getBuffer((result) => {
            try {
                res.attachment(`Reserva_${id}.pdf`);
                res.type('application/pdf');
                res.end(result, 'binary');
            }
            catch (error) {
                console.error('Error procesando imagen', error);
                res.status(500).send('Error proceso de imagen');
            }
        });
    }
    catch (error) {
        console.error('Error al generar el PDF', error);
        res.status(500).send('Error interno del servidor');
    }
});
exports.pdfReserva = pdfReserva;
const comprobarEstadoReserva = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservas = yield reserva_1.Reserva.findAll();
        for (const reserva of reservas) {
            const codigoReserva = reserva.getDataValue('COD_RESERVA');
            const estadoReserva = reserva.getDataValue('ESTADO');
            parseInt(codigoReserva, 10);
            if (estadoReserva == 'Cancelado') {
                const detalleReservas = yield detalle_reserva_1.DetalleReserva.findAll({ where: { COD_RESERVA: codigoReserva } });
                for (const detalleReserva of detalleReservas) {
                    const codigoProducto = detalleReserva.getDataValue('COD_PRODUCTO');
                    const cantidadProducto = detalleReserva.getDataValue('CANTIDAD');
                    parseInt(codigoProducto, 10);
                    parseInt(cantidadProducto, 10);
                    const producto = yield producto_1.Producto.findOne({ attributes: ['CANTIDAD_DISPONIBLE'], where: { COD_PRODUCTO: codigoProducto } });
                    const cantidadDisponible = producto === null || producto === void 0 ? void 0 : producto.getDataValue('CANTIDAD_DISPONIBLE');
                    parseInt(cantidadDisponible, 10);
                    yield producto_1.Producto.update({
                        CANTIDAD_DISPONIBLE: cantidadDisponible + cantidadProducto
                    }, { where: { COD_PRODUCTO: codigoProducto }
                    });
                }
                yield detalle_reserva_1.DetalleReserva.destroy({ where: { COD_RESERVA: codigoReserva } });
            }
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.comprobarEstadoReserva = comprobarEstadoReserva;
