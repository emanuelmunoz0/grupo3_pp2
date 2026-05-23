 
import cuponDb from '../../database/cupon_db.js';
import { Cupon } from '../models/Cupon.js';
 
const cuponController = {
    getAll: async(req, res) => {
        try{ 
            const cupones = await Cupon.findAll();
            res.json(cupones);
        } catch (error) {
           res.status(500).json({ error: "Error al obtener el cupón" });
       }
    },

     getById: async (req, res) => {
       
        try {
            const cupon = await Cupon.findByPk(req.params.id_cupon);
            if (cupon) {
                res.json(cupon);
            } else {    
                res.status(404).json({ error: 'Cupon no encontrado' });
            }
           
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el cupón" });
        }
    },
 

    create: async (req, res) => {
        try { 
            const { nombre, descuento } = req.body;
             if (!nombre || descuento === undefined) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }   
            const nuevoCupon = await Cupon.create(req.body);
             res.status(201).json({mensaje: 'Cupon creado exitosamente', cupon: nuevoCupon});  
                
        } catch (error) {
            res.status(400).json({ error: "Datos inválidos o incompletos" });
        }
    },
         
          
 
    update: async (req, res) => {
        try {
        const id = Number(req.params.id);
//        const { nombre, descuento } = req.body; 
//        if (nombre !== undefined) cupon.nombre = nombre;
//        if (descuento !== undefined) cupon.descuento = descuento;  
        const  [actualizado] = await Cupon.update(req.body, {
            where: { id_cupon: id },});
        if (actualizado) { res.json({ mensaje: "Cupón actualizado correctamente" });
        }else{
            return res.status(404).json({ error: 'Cupón no encontrado' });
        }
    }catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
        }
    },

   delete: async (req, res) => {
    try {   
        const borrados = await Cupon.destroy({ where: { id_cupon: req.params.id_cupon } });   
            if (borrados > 0) {
                return res.json({ mensaje: "Cupón eliminado correctamente" });
            } else {
            return res.status(404).json({ error: 'Cupón no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar" });
        } 
   
    } 
};

export default cuponController;
