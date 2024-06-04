import { Request, Response } from 'express';
import { Cliente } from '../models/cliente';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Rol } from '../models/rol';
import sequelize from 'sequelize';

export const newCliente = async (req: Request, res: Response) => {
    const { correo_cliente, celular_cliente, cod_rol, nombre_cliente, apellido_cliente, direccion_cliente } = req.body;

    const cliente = await Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });

    if (cliente) {
        return res.status(400).json({
            msg: 'Ya existe un cliente con ese correo'
        });
    }

    const hashedPassword = await bcrypt.hash(celular_cliente, 10);

    try {
        await Cliente.create({
            CORREO_CLIENTE: correo_cliente,
            CELULAR_CLIENTE: hashedPassword,
            COD_ROL: cod_rol,
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
                'COD_CLIENTE',
                'CORREO_CLIENTE',
                'CELULAR_CLIENTE',
                'NOMBRE_CLIENTE',
                'APELLIDO_CLIENTE',
                'DIRECCION_CLIENTE',
                [sequelize.col('Rol_Usuario.NOMBRE_ROL'), 'NOMBRE_ROL']
            ],
            include: {
                model: Rol,
                attributes: [],
            }
        });

        return res.json(listaClientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes.' });
    }
};

export const loginCliente = async (req: Request, res: Response) => {
    const { correo_cliente, celular_cliente } = req.body;

    // Validación de cliente
    const cliente: any = await Cliente.findOne({ where: { CORREO_CLIENTE: correo_cliente } });

    if (!cliente) {
        return res.status(401).json({
            msg: 'El correo ingresado no es válido'
        });
    }
    // Validación de contraseña
    const passwordValida = await bcrypt.compare(celular_cliente, cliente.CELULAR_CLIENTE);
    if (!passwordValida) {
        return res.status(401).json({
            msg: 'Contraseña Incorrecta'
        });
    }

    // Generar token
    const codRol = cliente.dataValues.COD_ROL;
    const token = jwt.sign({
        correo_cliente: correo_cliente,
        role: codRol
    }, process.env.SECRET_KEY || 'PRUEBA1');

    res.json({ token, rol: codRol });
};

export const getCliente = async (req: Request, res: Response) => {
    const { cod_cliente } = req.params;
    const idCliente = await Cliente.findOne({
        attributes: [
            'COD_CLIENTE',
            'CORREO_CLIENTE',
            'CELULAR_CLIENTE',
            'NOMBRE_CLIENTE',
            'APELLIDO_CLIENTE',
            'DIRECCION_CLIENTE',
            [sequelize.col('Rol_Usuario.NOMBRE_ROL'), 'NOMBRE_ROL']
        ],
        include: {
            model: Rol,
            attributes: []
        }, where: { COD_CLIENTE: cod_cliente }
    });
    if (!idCliente) {
        return res.status(404).json({
            msg: "El código de cliente indicado no existe"
        });
    }
    try {
        return res.json(idCliente);
    } catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
};

export const deleteCliente = async (req: Request, res: Response) => {
    const { cod_cliente } = req.params;
    const idCliente = await Cliente.findOne({ where: { COD_CLIENTE: cod_cliente } });

    if (!idCliente) {
        return res.status(404).json({
            msg: "El código " + cod_cliente + " de cliente no existe"
        });
    }
    try {
        await Cliente.destroy({ where: { COD_CLIENTE: cod_cliente } });
        res.json({
            msg: "Se ha eliminado al cliente: " + cod_cliente
        });
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el cliente con código: " + cod_cliente,
            error
        });
    }
};

export const updateCliente = async (req: Request, res: Response) => {
    const { cod_cliente } = req.params;
    const idCliente = await Cliente.findOne({ where: { COD_CLIENTE: cod_cliente } });

    if (!idCliente) {
        return res.status(404).json({
            msg: "El código " + cod_cliente + " de cliente no existe"
        });
    }
    try {
        const { correo_cliente, celular_cliente, cod_rol, nombre_cliente, apellido_cliente, direccion_cliente } = req.body;
        if (celular_cliente != null) {
            const hashedPassword = await bcrypt.hash(celular_cliente, 10);
            await Cliente.update({
                CORREO_CLIENTE: correo_cliente,
                CELULAR_CLIENTE: hashedPassword,
                COD_ROL: cod_rol,
                NOMBRE_CLIENTE: nombre_cliente,
                APELLIDO_CLIENTE: apellido_cliente,
                DIRECCION_CLIENTE: direccion_cliente
            }, { where: { COD_CLIENTE: cod_cliente } });
            res.json({
                msg: "Se ha actualizado al cliente: " + cod_cliente
            });
        } else {
            await Cliente.update({
                CORREO_CLIENTE: correo_cliente,
                COD_ROL: cod_rol,
                NOMBRE_CLIENTE: nombre_cliente,
                APELLIDO_CLIENTE: apellido_cliente,
                DIRECCION_CLIENTE: direccion_cliente
            }, { where: { COD_CLIENTE: cod_cliente } });
            res.json({
                msg: "Se ha actualizado al cliente: " + cod_cliente
            });
        }
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el cliente con código: " + cod_cliente,
            error
        });
    }
};

