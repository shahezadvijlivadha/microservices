const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3007;

const optionsOrders = {
    target: 'http://localhost:3000',
    changeOrigin: true,
    logger: console,
};

const products = [
    {
        id: '1',
        name: 'product1',
        price: '50',
    },
    {
        id: '2',
        name: 'product2',
        price: '1',
    },
    {
        id: '3',
        name: 'product3',
        price: '150',
    }
];

const ordersProxy = createProxyMiddleware(optionsOrders);

app.get('/product', (req, res) => {
    res.json(products);
});

app.get('/product/:id', (req, res) => {
    const product = products.find(prod => prod.id === req.params.id);

    if (!product) { return res.status(404); }

    res.json(product);
});

app.post('/place-orders', ordersProxy);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
