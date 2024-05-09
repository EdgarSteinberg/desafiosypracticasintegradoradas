import ProducManager from './productManager.js'
const manager = new ProducManager("./products.json")

const run = async () => {

  await manager.addProduct({

    title: "titulo_1",
    description: "description",
    price: 100,
    thumbnail: "imagen1.jpg",
    code: 123,
    stock: 5
  })
  await manager.addProduct({

    title: "titulo_2",
    description: "description",
    price: 200,
    thumbnail: "imagen2.jpg",
    code: 1234,
    stock: 5
  })
  await manager.addProduct({

    title: "titulo_3",
    description: "description",
    price: 300,
    thumbnail: "imagen3.jpg",
    code: 1234,
    stock: 5
  })
  await manager.addProduct({

    title: "titulo_4",
    description: "description",
    price: 400,
    thumbnail: "imagen4.jpg",
    code: 12345,
    stock: 5
  })
  await manager.addProduct({

    title: "titulo_5",
    description: "description",
    price: 500,
    thumbnail: "imagen5.jpg",
    code: 123456,
    stock: 5
  })
  await manager.addProduct({

    title: "titulo_6",
    description: "description",
    price: 600,
    thumbnail: "imagen6.jpg",
    code: 12,
    stock: 5
  })
  await manager.addProduct({

    title: "titulo_7",
    description: "description",
    price: 700,
    thumbnail: "imagen7.jpg",
    code: 12349,
    stock: 5
  })
  await manager.addProduct({

    title: "titulo_8",
    description: "description",
    price: 800,
    thumbnail: "imagen8.jpg",
    code: 12348,
    stock: 5
  })
  await manager.addProduct({

    title: "titulo_9",
    description: "description",
    price: 900,
    thumbnail: "imagen9.jpg",
    code: 123498,
    stock: 5
  })
  await manager.addProduct({

    title: "titulo_10",
    description: "description",
    price: 1000,
    thumbnail: "imagen10.jpg",
    code: 1234,
    stock: 5
  })
}

run()

// const pruebas = async () => {
//   try {
//     const productById = await manager.getProductById(7);
//     console.log("Producto encontrado por ID:", productById);

//     //Eliminar un producto por ID
//     await manager.deleteProduct(2);

//     //Producto mofificado
//     const productModificado = await manager.updateProduct(
//       {
//         id: 1,
//         title: 'Mesa de pool',
//         description: 'Mesa de pool kids',
//         price: 10000,
//         thumbnail: 'mesaPool.jpg',
//         code: 1234,
//         stock: 5
//       }
//     )
//     console.log("Producto Modificado", productModificado)

//     //lista actualizada de productos
//     const products = await manager.getProducts();
//     console.log("Lista de productos actualizada:", products);

//   } catch (error) {
//     console.error("Error durante las pruebas:", error.message);
//   }

// }
// pruebas()








