const ProductManager = require('./src/ProductManager')
const express = require('express');
const app = express();


const PM = new ProductManager('./Products.json');

const port = 8080;
app.get("./products", async(req, res) => {   
    const allProducts = await ProductManager.getAllProducts()
    res.json(allProducts)
})

app.listen(port, () => {
    console.log("puerto 8080");
})