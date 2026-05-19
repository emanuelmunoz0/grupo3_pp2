 
import cuponDb from '../../database/cupon_db.js';
import { Cupon } from '../models/Cupon.js';
 
const cuponController = {
    getAll(req, res) {
        res.json(cuponDb);
    },
    getById(req, res) {
        const id = Number(req.params.id);
        const cupon = cuponDb.find(cupon => cupon.id_cupon === id); 
        if (!cupon) {
            return res.status(404).json({ error: 'Cupon no encontrado' });
        }
        res.json(cupon);
    },
 

    create (req,res)  {  
        const { id, nombre, descuento } = req.body;
        const cupon = new Cupon({ id: cuponDb.length + 1, nombre, descuento });
        cuponDb.push(cupon);
        res.status(201).json(cupon);
    },
 
    update (req,res) {
        const id = Number(req.params.id);
        const cupon = cuponDb.find(item => item.id === id);
        if (!cupon) {
            return res.status(404).json({ error: 'Cupon no encontrado' });
        }   
        const { nombre, descuento } = req.body; 
        if (nombre !== undefined) cupon.nombre = nombre;
        if (descuento !== undefined) cupon.descuento = descuento;   

        return res.json(product);
    },

   remove (req,res) {
        const id = Number(req.params.id);
        const index = cuponDb.findIndex(item => item.id === id);    
        if (index !== -1) {
            const [removedCupon] = cuponDb.splice(index, 1);
            return res.json(removedCupon);
        }
        return res.status(404).json({ error: 'Cupon no encontrado' });
        
    cuponDb.splice(index, 1);

    return res.status(204).end();
}
};

export default cuponController;
