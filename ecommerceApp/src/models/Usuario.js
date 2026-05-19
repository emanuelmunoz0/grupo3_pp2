import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
 // El ID se crea solo por defecto (Autoincremental), no hace falta ponerlo
 nombre: {
 type: DataTypes.STRING,
 allowNull: false // Obligatorio
 },
 email: {
 type: DataTypes.STRING,
 allowNull: false,
 unique: true // Debe ser único
 },
 password: {
 type: DataTypes.STRING,
 allowNull: false
 },
 es_corporativo: {
 type: DataTypes.BOOLEAN,
 defaultValue: false
 },
 orden_compra: {
 type: DataTypes.ARRAY,
 defaultValue: [] 
 }
});

export default Usuario;

// export class Usuario {
//   constructor(id_usuario, nombre, email, password, es_corporativo) {
//     this.id_usuario = id_usuario;
//     this.nombre = nombre;
//     this.email = email;
//     this.password = password;
//     this.es_corporativo = es_corporativo;
//     this.OrdenCompra = [];
//   }
// }