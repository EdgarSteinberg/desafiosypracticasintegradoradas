import fs from 'fs'

class ProducManager {

    constructor(path) {
        this.products = []
        this.path = path
    }

    #getId() {

        if (this.products.length == 0) return 1
        return this.products[this.products.length - 1].id + 1
    }

    addProduct = async (producto) => {

        const product = {
            id: this.#getId(),
            title: producto.title,
            description: producto.description,
            price: producto.price,
            thumbnail: producto.thumbnail,
            code: producto.code,
            stock: producto.stock
        }

        this.products.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"))
    }

    getProducts = async () => {

        let respuesta = await fs.promises.readFile(this.path, "utf-8")
        return (JSON.parse(respuesta))
    }

    getProductById = async (productId) => {

        try {
            let respuesta = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(respuesta);

            const productEncontrado = products.find(pro => pro.id == productId)
            if (productEncontrado) {
                // console.log(productEncontrado) // mostrar en consola producto llamado por id
                return productEncontrado
            } else {
                console.error("Not Found 404, Producto no encontrado", productId);
                return null
            }
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error.message);
            return null;
        }

    }

    deleteProduct = async (productId) => {

        try {
            let respuesta = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(respuesta)

            let filtrarProduct = products.filter(pr => pr.id != productId)
            //console.log(filtrarProduct) 

            await fs.promises.writeFile(this.path, JSON.stringify(filtrarProduct, null, "\t"))

            return {filtrarProduct}
        } catch (error) {
            console.error("Error al eliminar el producto por ID", error.message)
            return null
        }

    }

    updateProduct = async ({ id, ...products }) => {

        try {
            await this.deleteProduct(id)

            let respuesta_1 = await fs.promises.readFile(this.path, "utf-8");
            const productos = JSON.parse(respuesta_1)

            let productModif = [
                { id, ...products }, // Producto modificado
                ...productos // Todos los productos existentes sin modificar
            ]

            await fs.promises.writeFile(this.path, JSON.stringify(productModif, null, "\t"))

            return { productModif }; 

        } catch (error) {
            console.error("Error al modificar el producto", error.message)
            return null
        }

    }
}

export default ProducManager






