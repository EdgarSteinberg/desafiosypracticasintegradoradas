import { Router } from 'express';
import { ProductManagerDB } from '../dao/productManagerDB.js';
import { uploader } from '../utils/multerUtil.js';

const Productrouter = Router();
const Manager = new ProductManagerDB();

Productrouter.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        // Obtener productos con paginación, ordenamiento y filtrado
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query
        };
        const productos = await Manager.getProducts(options);

        // Construir enlaces previos y siguientes
        const baseURL = "http://localhost:8080/api/products";
        const prevLink = page > 1 ? `${baseURL}?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null;
        const nextLink = productos.hasNextPage ? `${baseURL}?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null;

        res.json({
            status: 'success',
            payload: productos.docs,
            totalPages: productos.totalPages,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            page: page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});

Productrouter.get("/:pid", async (req, res) => {
    try {
        const producto = await Manager.getProductByID(req.params.pid);
        if (!producto) {
            return res.json({
                status: 'error',
                error: "Producto no encontrado"
            });
        }
        res.json({
            status: 'success',
            payload: producto
        });
    } catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});

Productrouter.post("/", uploader.array('thumbnail', 3), async (req, res) => {
    try {
        if (req.files) {
            req.body.thumbnail = [];
            req.files.forEach((file) => {
                req.body.thumbnail.push(file.filename);
            });
        }

        const result = await Manager.createProduct(req.body);
        res.json({
            status: 'success',
            payload: result
        });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});

Productrouter.put("/:pid", uploader.array('thumbnails', 3), async (req, res) => {
    try {
        const pid = req.params.pid;
        const result = await Manager.updateProduct(pid, req.body);
        res.json({
            status: 'success',
            payload: result
        });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});

Productrouter.delete("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        await Manager.deleteProduct(pid);
        res.json({
            status: 'success',
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});

export default Productrouter;
