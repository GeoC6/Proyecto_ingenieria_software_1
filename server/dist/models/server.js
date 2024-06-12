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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const rol_1 = require("./rol");
const roles_1 = __importDefault(require("../routes/roles"));
const user_1 = __importDefault(require("../routes/user"));
const producto_1 = __importDefault(require("../routes/producto"));
const vehiculo_1 = __importDefault(require("../routes/vehiculo"));
const reserva_1 = __importDefault(require("../routes/reserva"));
const detalle_reserva_1 = __importDefault(require("../routes/detalle_reserva"));
const cliente_1 = __importDefault(require("../routes/cliente"));
const facturas_1 = __importDefault(require("../routes/facturas"));
const carrito_1 = __importDefault(require("../routes/carrito"));
const detalle_factura_1 = __importDefault(require("../routes/detalle_factura"));
const metodos_de_pago_1 = __importDefault(require("../routes/metodos_de_pago"));
const deposito_1 = __importDefault(require("../routes/deposito"));
const datos_de_tarjeta_1 = __importDefault(require("../routes/datos_de_tarjeta"));
const pagos_1 = __importDefault(require("../routes/pagos"));
const transaccion_1 = __importDefault(require("../routes/transaccion"));
const webpayRoutes_1 = __importDefault(require("../routes/webpayRoutes"));
const user_2 = require("./user");
const producto_2 = require("./producto");
const vehiculo_2 = require("./vehiculo");
const reserva_2 = require("./reserva");
const detalle_reserva_2 = require("./detalle_reserva");
const reserva_3 = require("../controllers/reserva");
const cliente_2 = require("./cliente");
const carrito_2 = require("./carrito");
const facturas_2 = require("./facturas");
const detalle_factura_2 = require("./detalle_factura");
const user_3 = require("../controllers/user");
const metodos_de_pago_2 = require("./metodos_de_pago");
const deposito_2 = require("./deposito");
const datos_de_tarjeta_2 = require("./datos_de_tarjeta");
const pagos_2 = require("./pagos");
const transaccion_2 = require("./transaccion");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.midlewares();
        this.listen();
        this.dbConnect();
        this.routes();
        this.startReservaStateCheck();
        // this.firstUser()
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/roles', roles_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/productos', producto_1.default);
        this.app.use('/api/vehiculos', vehiculo_1.default);
        this.app.use('/api/reserva', reserva_1.default);
        this.app.use('/api/det_reserva_producto', detalle_reserva_1.default);
        this.app.use('/api/metodos_de_pago', metodos_de_pago_1.default);
        this.app.use('/api/deposito', deposito_1.default);
        this.app.use('/api/tarjeta', datos_de_tarjeta_1.default);
        this.app.use('/api/pago', pagos_1.default);
        this.app.use('/api/transacciones', transaccion_1.default);
        this.app.use('/api/cliente', cliente_1.default);
        this.app.use('/api/carrito', carrito_1.default);
        this.app.use('/api/facturas', facturas_1.default);
        this.app.use('/api/detalle_factura', detalle_factura_1.default);
        this.app.use('/webpay', webpayRoutes_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield vehiculo_2.Vehiculo.sync();
                yield rol_1.Rol.sync();
                yield user_2.User.sync();
                yield producto_2.Producto.sync();
                yield reserva_2.Reserva.sync();
                yield detalle_reserva_2.DetalleReserva.sync();
                yield metodos_de_pago_2.metodos_de_pago.sync();
                yield deposito_2.deposito.sync();
                yield pagos_2.pagos.sync();
                yield transaccion_2.transaccion.sync();
                yield datos_de_tarjeta_2.datos_de_tarjeta.sync();
                yield cliente_2.Cliente.sync();
                yield facturas_2.Facturas.sync();
                yield detalle_factura_2.Detalle_Factura.sync();
                yield carrito_2.Carrito.sync();
            }
            catch (error) {
                console.error('No se ha podido conectar a la base de datos', error);
            }
        });
    }
    firstUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, user_3.firstSteps)();
            }
            catch (error) {
                console.error('Ha ocurrido un error en el servidor', error);
            }
        });
    }
    startReservaStateCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    (0, reserva_3.comprobarEstadoReserva)();
                }
                catch (error) {
                    console.error('Ha ocurrido un error en el servidor', error);
                }
            }), 1500000);
        });
    }
}
exports.default = Server;
