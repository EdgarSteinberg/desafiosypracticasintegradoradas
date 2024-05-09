// const express = require("express");
// const router = express.Router();
// const ProductManager = require("../controllers/product-manager-db.js");
// const CartManager = require("../controllers/cart-manager-db.js");
// const productManager = new ProductManager();
// const cartManager = new CartManager();

// router.get("/products", async (req, res) => {
//    try {
//       const { page = 1, limit = 2 } = req.query;
//       const productos = await productManager.getProducts({
//          page: parseInt(page),
//          limit: parseInt(limit)
//       });

//       const nuevoArray = productos.docs.map(producto => {
//          const { _id, ...rest } = producto.toObject();
//          return rest;
//       });

//       res.render("products", {
//          productos: nuevoArray,
//          hasPrevPage: productos.hasPrevPage,
//          hasNextPage: productos.hasNextPage,
//          prevPage: productos.prevPage,
//          nextPage: productos.nextPage,
//          currentPage: productos.page,
//          totalPages: productos.totalPages
//       });

//    } catch (error) {
//       console.error("Error al obtener productos", error);
//       res.status(500).json({
//          status: 'error',
//          error: "Error interno del servidor"
//       });
//    }
// });

// router.get("/carts/:cid", async (req, res) => {
//    const cartId = req.params.cid;

//    try {
//       const carrito = await cartManager.getCarritoById(cartId);

//       if (!carrito) {
//          console.log("No existe ese carrito con el id");
//          return res.status(404).json({ error: "Carrito no encontrado" });
//       }

//       const productosEnCarrito = carrito.products.map(item => ({
//          product: item.product.toObject(),
//          //Lo convertimos a objeto para pasar las restricciones de Exp Handlebars. 
//          quantity: item.quantity
//       }));


//       res.render("carts", { productos: productosEnCarrito });
//    } catch (error) {
//       console.error("Error al obtener el carrito", error);
//       res.status(500).json({ error: "Error interno del servidor" });
//    }
// });

// module.exports = router; 


import { Router } from 'express';
import { ProductManagerDB } from '../dao/productManagerDB.js';
import { MessagesManagerDB } from '../dao/messagesManagerDB.js';

const router = Router();
const Manager = new ProductManagerDB();
const Messages = new MessagesManagerDB();

router.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        // Obtener productos con paginación, ordenamiento y filtrado
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query
        };
        const allProducts = await Manager.getProducts(options);

        res.render("home.handlebars", {
            title: "Coder Ecommerce",
            products: allProducts.docs, // Utiliza solo los documentos de la respuesta paginada
            totalPages: allProducts.totalPages,
            prevPage: allProducts.prevPage,
            nextPage: allProducts.nextPage,
            page: page,
            hasPrevPage: allProducts.hasPrevPage,
            hasNextPage: allProducts.hasNextPage,
            prevLink: allProducts.hasPrevPage ? `/?limit=${limit}&page=${allProducts.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: allProducts.hasNextPage ? `/?limit=${limit}&page=${allProducts.nextPage}&sort=${sort}&query=${query}` : null,
            style: "index.css"
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).render("error.handlebars", {
            title: "Error",
            message: "Error interno del servidor"
        });
    }
});

router.get("/realTimeProducts", async (req, res) => {
    try {
        const allProduct = await Manager.getAllProducts();

        res.render("realTimeProduct", {
            title: "Coder Ecommerce",
            products: allProduct,
            style: "index.css"
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).render("error.handlebars", {
            title: "Error",
            message: "Error interno del servidor"
        });
    }
});

router.get("/chat", async (req,res) => {
    try {
        const allMessage = await Messages.getAllMessages();

        res.render("chat", {
            title: "Coder Chat",
            chats: allMessage,
            style: "index.css"
        });
    } catch (error) {
        console.error("Error al obtener mensajes:", error);
        res.status(500).render("error.handlebars", {
            title: "Error",
            message: "Error interno del servidor"
        });
    }
});

export default router;
