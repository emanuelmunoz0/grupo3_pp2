import Categoria from "../models/Categoria.js";

const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);  
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const createCategoria = async (req, res) => {
  try {
    const nuevaCategoria = await Categoria.create(req.body);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
const updateCategoria = async (req, res) => {
  try {
    const [actualizado] = await Categoria.update(req.body, {        
      where: { id: req.params.id }
    });
    if (actualizado) {
      const categoriaActualizada = await Categoria.findByPk(req.params.id);
      res.json(categoriaActualizada);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
    const deleteCategoria = async (req, res) => {
      try {
        const borrados = await Categoria.destroy({ where: { id: req.params.id } });
        if (borrados) {
          res.json({ message: "Categoría eliminada correctamente" });
        } else {
          res.status(404).json({ message: "Categoría no encontrada" });
        }
      } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        res.status(500).json({ message: "Error interno del servidor" });
      }
    };  
    export const categoriaController = {
    getCategorias,
    getCategoriaById, 
    createCategoria,
    updateCategoria,
    deleteCategoria
};      