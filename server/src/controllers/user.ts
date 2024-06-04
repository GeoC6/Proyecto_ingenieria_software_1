import {Request, Response} from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Rol } from '../models/rol';
import sequelize from 'sequelize';

export const newUser = async(req: Request, res: Response) =>{

    const { rut_usuario, contrasena, nombre_usuario, apellido1_usuario, apellido2_usuario, cod_rol} =  req.body;

    const usuario = await User.findOne({where: {RUT_USUARIO: rut_usuario}})

    if(usuario) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con ese rut'
        })
    }

    const hashedpassword = await bcrypt.hash(contrasena, 10)

    try{
         await User.create({
            "RUT_USUARIO": rut_usuario,
            "CONTRASEÑA": hashedpassword,
            "NOMBRE_USUARIO":nombre_usuario,
            "APELLIDO1_USUARIO": apellido1_usuario,
            "APELLIDO2_USUARIO":apellido2_usuario,
            "COD_ROL":cod_rol
        })
        return res.status(201).json({
            msg: 'Usuario creado correctamente'
            
        })

    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear el usuario',
            error
        })
    }
}



export const getUsers = async(req: Request, res: Response) =>{
    try{   
    const listUsers = await User.findAll({
        attributes: [
            'RUT_USUARIO',
            'NOMBRE_USUARIO',
            'APELLIDO1_USUARIO',
            'APELLIDO2_USUARIO',
            'CONTRASEÑA',
            'COD_ROL',
            [sequelize.col('Rol.NOMBRE_ROL'), 'NOMBRE_ROL']
        ],
        include: {
            model: Rol,
            attributes: [],
        }
    });

    return res.json(listUsers);
}catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
}

export const loginUser = async(req: Request, res: Response) =>{

    const { rut_usuario, contrasena } = req.body;

    // validacion de usuario
    const usuario: any = await User.findOne({where: {RUT_USUARIO: rut_usuario}})

    if(!usuario) {
        return res.status(401).json({
            msg: 'El rut ingresado no es valido'
        })
    }
    //validacion del password
    const passwordValida = await bcrypt.compare(contrasena, usuario.CONTRASEÑA)
    if(!passwordValida) {
        return res.status(401).json({
            msg: 'Contraseña Incorrecta'
        })
    }

    // generar token
    const codRol = usuario.dataValues.COD_ROL 
    const token = jwt.sign({
        rut_usuario: rut_usuario,
        role: codRol
    }, process.env.SECRET_KEY || 'PRUEBA1'); // , {expiresIn: '10000'} como tercer parametro para timepo de expiracion del token

    
    res.json({token, rol: codRol});

}

export const getUser = async(req: Request, res: Response) =>{
    const {rut_usuario} = req.params;
    const idUser = await User.findOne({
        attributes: [
            'RUT_USUARIO',
            'NOMBRE_USUARIO',
            'APELLIDO1_USUARIO',
            'APELLIDO2_USUARIO',
            'CONTRASEÑA',
            'COD_ROL',
            [sequelize.col('Rol.NOMBRE_ROL'), 'NOMBRE_ROL']
        ],
        include: {
            model: Rol,
            attributes: []
        },where: {RUT_USUARIO: rut_usuario}
    });
    if(!idUser) {
        return res.status(404).json({
            msg: "El rut de usuario indicado no existe"
        })
    }
    try{
        return res.json(idUser)
    }catch (error){
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })

    }
}

export const deleteUser = async(req: Request, res: Response) =>{
    const {rut_usuario} = req.params;
    const idUser = await User.findOne({where: {RUT_USUARIO: rut_usuario}})

    if(!idUser) {
        return res.status(404).json({
            msg: "El rut "+rut_usuario+ " de usuario no existe"
        })
    }
    try{
        await User.destroy({where: {RUT_USUARIO: rut_usuario}})
        res.json({
            msg: "Se ha eliminado al usuario: "+rut_usuario
        })
    }catch (error){
        res.status(400).json({
            msg: "No se ha podido eliminar el usuario con rut: "+rut_usuario,
            error
        })
    }
}

export const updateUser = async(req: Request, res: Response)=>{
    const {rut_usuario} = req.params;
    const idUser = await User.findOne({where: {RUT_USUARIO: rut_usuario}})

    if(!idUser) {
        return res.status(404).json({
            msg: "El rut "+rut_usuario+ " de usuario no existe"
        })
    }
    try{
        const {nombre_usuario,apellido1_usuario,apellido2_usuario,contrasena,cod_rol} = req.body;
        if (contrasena != null){
            const hashedpassword = await bcrypt.hash(contrasena, 10)
            await User.update({
                NOMBRE_USUARIO: nombre_usuario,
                APELLIDO1_USUARIO: apellido1_usuario,
                APELLIDO2_USUARIO: apellido2_usuario,
                CONTRASEÑA: hashedpassword,
                COD_ROL:cod_rol
    
            },{where: {RUT_USUARIO: rut_usuario}
        })
            res.json({
                msg: "Se ha actualizado al usuario: "+rut_usuario
            })
        } else{
            await User.update({
                NOMBRE_USUARIO: nombre_usuario,
                APELLIDO1_USUARIO: apellido1_usuario,
                APELLIDO2_USUARIO: apellido2_usuario,
                COD_ROL:cod_rol
    
            },{where: {RUT_USUARIO: rut_usuario}
        })
            res.json({
                msg: "Se ha actualizado al usuario: "+rut_usuario
            })

        }
    }catch (error){
        res.status(400).json({
            msg: "No se ha podido actualizar el usuario con rut: "+rut_usuario,
            error
        })
    }
}

export const firstSteps = async() => {
    const user = "admin"
    const hashedpassword = await bcrypt.hash("admin", 10)
    const rol = await Rol.findAll()
    if (!rol || rol.length == 0){
        const existeRol = await Rol.create({
            "NOMBRE_ROL": "Administrador",
    })
    const usuario = await User.findOne({where:{RUT_USUARIO: user,COD_ROL: existeRol.getDataValue('COD_ROL')}})
    if (!usuario){
        await User.create({
            "RUT_USUARIO": user,
            "CONTRASEÑA": hashedpassword,
            "COD_ROL":1
    })
}
    }else {
        const existeRol = await Rol.findOne({where:{NOMBRE_ROL: "Administrador"}})
        const usuario = await User.findOne({where:{RUT_USUARIO: user,COD_ROL: existeRol?.getDataValue('COD_ROL')}})
        if (!usuario){
            await User.create({
                "RUT_USUARIO": user,
                "CONTRASEÑA": hashedpassword,
                "COD_ROL":1
        })
    }
    }




}