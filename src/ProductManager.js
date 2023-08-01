const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.path = path;
    }

    async GetAllProducts() {
        try {
            const products = await fs.promises.readFile(this.path, "utf-8");

            return JSON.parse(products);
        } catch (error) {

            return [];
        }
    }

    async GetProductById(id) {
        const products = await this.GetAllProducts();

        for (let key in products) {
            if (products[key].Id == Id) {
                return products[key];
            }
        }

        return {};
    }

    async CreateProduct(product) {
        const products = await this.GetAllProducts();

        const newProduct = {
            Id: this.GetProductId(products),
            Title: product.Title ?? "sin titulo",
            Description: product.Description ?? "Sin descripcion",
            Price: product.Price ?? "Sin precio",
            Code: product.Code ?? "sin codigo",
            Stock: product.Stock ?? "sin stock"
        };
        product.push(newProduct);

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));

            return newProduct;
        } catch(e) {
            return {
                message: "Error al buscar el producto"
            };
        }
    }

    GetProductId(products) {
        const productLength = products.length;
        if(productLength > 0) {
            return parseInt(products[productLength - 1].Id) + 1;
        }
        return 1;
    }



}


module.exports = ProductManager;