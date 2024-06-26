import { Request, Response } from 'express';
import { Cliente } from '../models/cliente';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const newCliente = async (req: Request, res: Response) => {
    const { correo_cliente, contrasena, celular_cliente, nombre_cliente, apellido_cliente, direccion_cliente } = req.body;

    if (!correo_cliente || !contrasena || !celular_cliente || !nombre_cliente || !apellido_cliente || !direccion_cliente) {
        return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    try {
        const cliente = await Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });

        if (cliente) {
            return res.status(400).json({
                msg: 'Ya existe un cliente con ese correo'
            });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        await Cliente.create({
            CORREO_CLIENTE: correo_cliente,
            CONTRASENA: hashedPassword,
            CELULAR_CLIENTE: celular_cliente,
            NOMBRE_CLIENTE: nombre_cliente,
            APELLIDO_CLIENTE: apellido_cliente,
            DIRECCION_CLIENTE: direccion_cliente
        });

        return res.status(201).json({
            msg: 'Cliente creado correctamente'
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al crear el cliente',
            error
        });
    }
};

export const getClientes = async (req: Request, res: Response) => {
    try {
        const listaClientes = await Cliente.findAll({
            attributes: [
                'CORREO_CLIENTE',
                'CELULAR_CLIENTE',
                'NOMBRE_CLIENTE',
                'APELLIDO_CLIENTE',
                'DIRECCION_CLIENTE'
            ]
        });

        return res.json(listaClientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes.' });
    }
};

export const loginCliente = async (req: Request, res: Response) => {
    const { correo_cliente, contrasena } = req.body;

    if (!correo_cliente || !contrasena) {
        return res.status(400).json({ msg: 'Correo y contraseña son obligatorios' });
    }

    try {
        const cliente: any = await Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });

        if (!cliente) {
            return res.status(401).json({
                msg: 'El correo ingresado no es válido'
            });
        }

        const passwordValida = await bcrypt.compare(contrasena, cliente.CONTRASENA);
        if (!passwordValida) {
            return res.status(401).json({
                msg: 'Contraseña Incorrecta'
            });
        }

        const token = jwt.sign({
            correo_cliente: correo_cliente
        }, process.env.SECRET_KEY || 'PRUEBA1');

        res.json({ token });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al iniciar sesión',
            error
        });
    }
};

export const getCliente = async (req: Request, res: Response) => {
    const { correo_cliente } = req.params;

    try {
        const cliente = await Cliente.findOne({
            attributes: [
                'CORREO_CLIENTE',
                'CELULAR_CLIENTE',
                'NOMBRE_CLIENTE',
                'APELLIDO_CLIENTE',
                'DIRECCION_CLIENTE'
            ],
            where: { CORREO_CLIENTE: correo_cliente }
        });

        if (!cliente) {
            return res.status(404).json({
                msg: "El correo de cliente indicado no existe"
            });
        }

        return res.json(cliente);
    } catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
};

export const deleteCliente = async (req: Request, res: Response) => {
    const { correo_cliente } = req.params;

    try {
        const cliente = await Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });

        if (!cliente) {
            return res.status(404).json({
                msg: "El correo " + correo_cliente + " de cliente no existe"
            });
        }

        await Cliente.destroy({ where: { CORREO_CLIENTE: correo_cliente } });
        res.json({
            msg: "Se ha eliminado al cliente: " + correo_cliente
        });
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el cliente con correo: " + correo_cliente,
            error
        });
    }
};

export const updateCliente = async (req: Request, res: Response) => {
    const { correo_cliente } = req.params;

    try {
        const cliente = await Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });

        if (!cliente) {
            return res.status(404).json({
                msg: "El correo " + correo_cliente + " de cliente no existe"
            });
        }

        const { contrasena, celular_cliente, nombre_cliente, apellido_cliente, direccion_cliente } = req.body;
        let updateData: any = {
            CELULAR_CLIENTE: celular_cliente,
            NOMBRE_CLIENTE: nombre_cliente,
            APELLIDO_CLIENTE: apellido_cliente,
            DIRECCION_CLIENTE: direccion_cliente
        };

        if (contrasena) {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            updateData.CONTRASENA = hashedPassword;
        }

        await Cliente.update(updateData, { where: { CORREO_CLIENTE: correo_cliente } });

        res.json({
            msg: "Se ha actualizado al cliente: " + correo_cliente
        });
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el cliente con correo: " + correo_cliente,
            error
        });
    }
};