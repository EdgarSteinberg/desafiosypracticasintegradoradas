import express from 'express'
import ProducManager from './productManager.js'

const manager = new ProducManager("./products.json")
const app = express()

app.use(express.urlencoded({ extended: true }))

const PORT = 8080

app.get("/", (req, res) => {
    res.send(`<h1>Bienvenidos a mi Ecommerce. Haz click aqui <a href="http://localhost:${PORT}/products">/products</a>`)
})


app.get("/products", async (req, res) => {
    let products = await manager.getProducts(); // Obtener todos los productos
    const { limit } = req.query;

    if (limit) {
        products = products.slice(0, limit)
    }

    res.send(products); // Enviar la lista completa de productos como respuesta en formato JSON

});

app.get("/products/:pid", async (req, res) => {
    const productId = req.params.pid;
    //console.log("ID del producto solicitado:", productId);

    const product = await manager.getProductById(productId);
    // console.log("Producto obtenido de la base de datos:", product);
    if (!product) {
        return res.send({
            error: "Usuario no encontrado"
        })
    }
    res.send(product);
});



//const PORT = 8080

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`)
})