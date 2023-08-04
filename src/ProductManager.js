const fs = require('fs');


class ProductManager {

 constructor(path) {
  this.path = path;
 }

 async getAllProduct() {
   try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  async createProduct(product) {
    try {
      const products = await this.getAllProduct();
      const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
      const newProduct = {
        id: lastProductId + 1,
        title: product.title || "sin titulo",
        description: product.description || "sin descripcion",
        price: product.price || "sin precio",
        code: product.code || "sin codigo",
        stock: product.stock || "sin stock"
      };
  
      products.push(newProduct);
  
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
      
    }  catch(e) {
      throw new Error("Error al crear el producto", e);
    }
 } 

 async getProductById(id) {
   try {
     const productos = await this.getAllProduct();
     const product = productos.find((o) => o.id === id);
     return product || null;

    } catch (error) {
     throw new Error("Error al obtener el producto");
    }
  }

 async saveObject(productos) {
   try {
     await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));

    } catch (error) {
      throw new Error("Error al guardar los productos", error.message);
   }
 }

 async deleteProduct(id) {
   try {
     let productos = await this.getAllProduct();
     productos = productos.filter((o) => o.Id !== id);
     await this.saveObject(productos);

    } catch (error) {
     throw new Error("Error al eliminar el objeto");
    }
  }


 async updateProduct(objeto) {
   try {
     const productos = await this.getAllProduct();
     const productApp = productos.findIndex((o) => o.Id === objeto.Id);

     if (productApp === -1) {
      throw new Error("El producto con el ID proporcionado no existe.");
     }

     productos[productApp] = {
      ...productos[productApp],
      ...objeto
     };

     await this.saveObject(productos);

    } catch (error) {
     throw new Error("Error al actualizar el producto:", error.message);
    }
  }

}

module.exports = ProductManager;