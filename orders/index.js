const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const orders = [];

let orderCount = 0;

app.use(bodyParser.json());
app.post('/create-order', async (req, res) => {
    const response = await axios.get('http://localhost:3007/product');
    const products = response.data;

    const {
        productId,
        quantity,
    } = req.body;
    
    console.log(req.body);
    console.log(products);

    const product = products.find(p => p.id === productId);

    console.log('product', product);

    if (product) {
        orders.push({
            id: ++orderCount,
            productId: productId,
            quantity: +quantity,
            total: +quantity * +product.price,
        })
        res.send('order placed successfully');
    } else {
        res.send('Product not available');
    }
});

app.get('/order-details', (req, res) => {
    res.json(orders);
});

app.post('/place-orders', (req, res) => res.send('place-orders response'));

app.listen(port, () => console.log(`orders app listening on port ${port}!`));
