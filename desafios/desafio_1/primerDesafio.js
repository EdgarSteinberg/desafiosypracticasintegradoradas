
class ProducManager {
    constructor() {
        this.products = []
    }

    getProducts() {
        return this.products
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        
        const campos = [title, description, price, thumbnail, code, stock];
        let nombreCampos = ["title", "description", "price", "thumbnail","stock"]

        for (let i = 0; i < campos.length; i++) {
           if(!campos[i]){
            console.error(`Debes ingresar todos los campos ${nombreCampos}`)
           }        
        }
 
        if (this.products.find(pr => pr.code === code)) {
            console.error("Ya existe un producto con el mismo codigo ")
        }
        
        const product = {
            id: this.#getId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(product)
    }

    #getId() {
        if (this.products.length == 0) return 1

        return this.products[this.products.length - 1].id + 1
    }

    getProductById(productsId) {
        const product = this.products.find(pro => pro.id == productsId)
        if (product) {
            return product
        } else {
            console.error("Not Found 404")
        }
    }
}

const manager = new ProducManager()

manager.addProduct("Mesa de pool", "Mesa de pool profesional", 100, "mesaPool.jpg", 1234, 5);
manager.addProduct("Metegol", "Metegol estadio retro", 70, "metegol.jpg", 12345, 10);

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(2));
console.log(manager.getProductById(3)); // Not Found El Producto No Existe


