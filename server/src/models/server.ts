import express, { Application } from 'express';
import cors from 'cors';
import { Rol } from './rol';
import routesRoles from '../routes/roles';
import routesUser from '../routes/user';
import routesProducto from '../routes/producto';
import routesVehiculo from '../routes/vehiculo';
import routesReserva from '../routes/reserva';
import routesDet_reserva from '../routes/detalle_reserva';
import routesCliente from '../routes/cliente';
import routesFacturas from '../routes/facturas';
import routesCarrito from '../routes/carrito';
import routesDetalle_factura from '../routes/detalle_factura';
import routesMetodos from '../routes/metodos_de_pago';
import routesDepositos from '../routes/deposito';
import routesTarjetas from '../routes/datos_de_tarjeta';
import routesPagos from '../routes/pagos';
import routesTransacciones from '../routes/transaccion';
import { User } from './user';
import { Producto } from './producto';
import { Vehiculo } from './vehiculo';
import { Reserva } from './reserva';
import { DetalleReserva } from './detalle_reserva';
import { comprobarEstadoReserva } from '../controllers/reserva';
import { Cliente } from './cliente';
import { Carrito } from './carrito';
import { Facturas } from './facturas';
import { Detalle_Factura } from './detalle_factura';
import { firstSteps } from '../controllers/user';
import { metodos_de_pago } from './metodos_de_pago';
import { deposito } from './deposito';
import { datos_de_tarjeta } from './datos_de_tarjeta';
import { pagos } from './pagos';
import { transaccion } from './transaccion';




class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';


        this.midlewares();
        this.listen();
        this.dbConnect();
        this.routes();
        this.startReservaStateCheck()
        // this.firstUser()


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/vehiculos', routesVehiculo);
        this.app.use('/api/roles', routesRoles);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/vehiculos', routesVehiculo);
        this.app.use('/api/reserva', routesReserva);
        this.app.use('/api/det_reserva_producto', routesDet_reserva);
        this.app.use('/api/metodos_de_pago', routesMetodos);
        this.app.use('/api/deposito', routesDepositos);
        this.app.use('/api/tarjeta', routesTarjetas);
        this.app.use('/api/pago', routesPagos);
        this.app.use('/api/transacciones', routesTransacciones);
        this.app.use('/api/cliente', routesCliente);
        this.app.use('/api/carrito', routesCarrito);
        this.app.use('/api/facturas', routesFacturas);
        this.app.use('/api/detalle_factura', routesDetalle_factura);
    }

    midlewares() {

        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await Vehiculo.sync()
            await Rol.sync()
            await User.sync()
            await Producto.sync()
            await Reserva.sync()
            await DetalleReserva.sync()
            await metodos_de_pago.sync()
            await deposito.sync()
            await pagos.sync()
            await transaccion.sync()
            await datos_de_tarjeta.sync()
            await Cliente.sync()
            await Facturas.sync()
            await Detalle_Factura.sync()
            await Carrito.sync()

        } catch (error) {
            console.error('No se ha podido conectar a la base de datos');
        }
    }

    async firstUser() {
        try {
            await firstSteps()
        } catch (error) {
            console.error('Ha ocurrido un error en el servidor', error);

        }
    }
    async startReservaStateCheck() {
        setInterval(async () => {
            try {
                comprobarEstadoReserva()

            } catch (error) {
                console.error('Ha ocurrido un error en el servidor', error);
            }
        }, 1500000);
    }
}
export default Server;
