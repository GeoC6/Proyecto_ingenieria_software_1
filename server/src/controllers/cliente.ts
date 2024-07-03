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
                'COD_CLIENTE',
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
    // const { correo_cliente, contrasena } = req.body;
    const correo_cliente = req.body.correo_cliente;
    const contrasena = req.body.contrasena;

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

        res.json({ token,  cliente});
    } catch (error) {
        res.status(500).json({
            msg: 'Error al iniciar sesión',
            error
        });
    }
};

export const getPerfil = async (req: Request, res: Response) => {
    const cod_cliente = req.body.cod_cliente;
    if (!cod_cliente){
        return res.status(400).json({
            msg: 'Error al cargar informacion del Perfil',
        });
    }
    try {
        const infoPerfil = await Cliente.findOne({
            attributes: [
                'COD_CLIENTE',
                'CORREO_CLIENTE',
                'CELULAR_CLIENTE',
                'NOMBRE_CLIENTE',
                'APELLIDO_CLIENTE',
                'DIRECCION_CLIENTE',
            ]
        });
        console.log(infoPerfil)
        res.json({infoPerfil})
    }catch (error) {
        res.status(404).json({
            msg: 'Perfil no valido',
            error
        });
    }
};

export const getCliente = async (req: Request, res: Response) => {
    const { cod_cliente } = req.params;
    try {
        const idCliente = await Cliente.findOne({
            attributes: [
                'COD_CLIENTE',
                'CORREO_CLIENTE',
                'CELULAR_CLIENTE',
                'NOMBRE_CLIENTE',
                'APELLIDO_CLIENTE',
                'DIRECCION_CLIENTE',
                // 'CODIGO_CLIENTE'
            ],
            where: { COD_CLIENTE: cod_cliente }
        });
        if (!idCliente) {
            return res.status(404).json({
                msg: "El código de cliente indicado no existe"
            });
        }
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

    try {
        const idCliente = await Cliente.findOne({ where: { COD_CLIENTE: cod_cliente } });

        if (!idCliente) {
            return res.status(404).json({
                msg: "El código " + cod_cliente + " de cliente no existe"
            });
        }

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

    try {
        const idCliente = await Cliente.findOne({ where: { COD_CLIENTE: cod_cliente } });

        if (!idCliente) {
            return res.status(404).json({
                msg: "El código " + cod_cliente + " de cliente no existe"
            });
        }

        const { correo_cliente, contrasena, celular_cliente, nombre_cliente, apellido_cliente, direccion_cliente } = req.body;
        let updateData: any = {
            CORREO_CLIENTE: correo_cliente,
            CELULAR_CLIENTE: celular_cliente,
            NOMBRE_CLIENTE: nombre_cliente,
            APELLIDO_CLIENTE: apellido_cliente,
            DIRECCION_CLIENTE: direccion_cliente
        };

        if (contrasena) {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            updateData.CONTRASENA = hashedPassword;
        }

        await Cliente.update(updateData, { where: { COD_CLIENTE: cod_cliente } });

        res.json({
            msg: "Se ha actualizado al cliente: " + cod_cliente
        });
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el cliente con código: " + cod_cliente,
            error
        });
    }
};