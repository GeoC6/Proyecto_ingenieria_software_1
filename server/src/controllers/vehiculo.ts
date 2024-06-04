import { Request, Response } from 'express';
import { Vehiculo } from '../models/vehiculo';

export const newVehiculo = async (req: Request, res: Response) => {
    const { patente_cod_vehiculo, marca, modelo, color, ano } = req.body;

    const vehiculo = await Vehiculo.findOne({ where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });

    if (vehiculo) {
        return res.status(400).json({
            msg: 'Ya existe un vehículo con esa patente'
        });
    }

    try {
        await Vehiculo.create({
            PATENTE_COD_VEHICULO: patente_cod_vehiculo,
            MARCA: marca,
            MODELO: modelo,
            COLOR: color,
            ANO: ano
        });
        return res.status(201).json({
            msg: 'Vehículo creado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error
        });
    }
};

export const getVehiculos = async (req: Request, res: Response) => {
    const listVehiculos = await Vehiculo.findAll({
        attributes: ['PATENTE_COD_VEHICULO', 'MARCA', 'MODELO', 'COLOR', 'ANO']
    });

    res.json(listVehiculos);
};

export const getVehiculo = async (req: Request, res: Response) => {
    const { patente_cod_vehiculo } = req.params;
    const vehiculo = await Vehiculo.findOne({ where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });

    if (!vehiculo) {
        return res.status(404).json({
            msg: "El vehículo con la patente indicada no existe"
        });
    }
    try {
        return res.json(vehiculo);
    } catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
};

export const deleteVehiculo = async (req: Request, res: Response) => {
    const { patente_cod_vehiculo } = req.params;
    const vehiculo = await Vehiculo.findOne({ where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });

    if (!vehiculo) {
        return res.status(404).json({
            msg: "El vehículo con la patente " + patente_cod_vehiculo + " no existe"
        });
    }

    try {
        await Vehiculo.destroy({ where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });
        res.json({
            msg: "Se ha eliminado el vehículo con patente: " + patente_cod_vehiculo
        });
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el vehículo con patente: " + patente_cod_vehiculo,
            error
        });
    }
};

export const updateVehiculo = async (req: Request, res: Response) => {
    const { patente_cod_vehiculo } = req.params;
    const vehiculo = await Vehiculo.findOne({ where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });

    if (!vehiculo) {
        return res.status(404).json({
            msg: "El vehículo con la patente " + patente_cod_vehiculo + " no existe"
        });
    }

    try {
        const { marca, modelo, color, ano } = req.body;
        await Vehiculo.update({
            MARCA: marca,
            MODELO: modelo,
            COLOR: color,
            ANO: ano
        }, { where: { PATENTE_COD_VEHICULO: patente_cod_vehiculo } });

        res.json({
            msg: "Se ha actualizado el vehículo con patente: " + patente_cod_vehiculo
        });
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el vehículo con patente: " + patente_cod_vehiculo,
            error
        });
    }
};
