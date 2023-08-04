const ProductManager = require('./src/ProductManager')
const express = require('express');
const app = express();

const PM = new ProductManager('./products.json');

const PORT = 8080;

const newProduct = {
    id: "1",
    title: "Taza homero js",
    description: "taza de ceramica",
    price: "1500",
    code: "001",
    stock: 10
}


PM.createProduct(newProduct);

app.get("/products", async(req, res) => { 
  
    try {
      const allProducts = await PM.getAllProduct();
              
    
      if(!allProducts || allProducts.length === 0) {
          return res.status(404).json({
          message: 'No existen productos disponibles'
        });
      }
    
      const { limit } = req.query;
      
      if(!limit) {
        const productsLimit = allProducts.splice(0, parceInt(limit));
        return res.status(200).json(productsLimit);
      } else {
        return res.status(200).json(allProducts);
      }  

    } catch(error) {

    return res.status(500).json({
    message: 'Tenemos inconvenientes con nuestro servidor, disculpe las molestias',
    error: error.message
    });
 }
  
});
  
app.listen(PORT, () => {
 console.log("puerto 8080");
}) 