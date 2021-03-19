const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');
const ProductRouter = new express.Router();

const cloudinary = require('../utilities/cloudinary');
const upload = require('../utilities/multer');


ProductRouter.post('/', upload, async(req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        const { title, details, category, price } = req.body;
        const product = await Product.create({ title, details, category, price, imageUrl: result.secure_url });
        console.log(product);
        res.statusCode = 200;
        res.send(product);
    } catch (err) {
        res.statusCode = 422;
        res.send({ success: false, err: err });
    }
});

ProductRouter.get('/', async(req, res) => {
    try {
        const products = await Product.find().exec();
        console.log(products)
        res.statusCode = 200;
        res.send(products);

    } catch (error) {
        res.statusCode = 422;
        res.send({ message: 'not found' });

    }
});

ProductRouter.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });
        res.statusCode = 200;
        res.send({ product: product });
    } catch (err) {
        res.statusCode = 401;
        res.send({ message: 'not dound' });
    }
});

ProductRouter.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        await Product.deleteOne({ _id: id });
        res.statusCode = 200;
        res.send({ message: 'Product deleted' });
    } catch (err) {
        res.statusCode = 422;
        res.send({ message: 'deletion falied' });
    }
});

ProductRouter.get('/filter/:category', async(req, res) => {
    try {
        const filteredProducts = await Product.find({ category: req.params.category });
        console.log(filteredProducts);
        res.statusCode = 200;
        res.send(filteredProducts);
    } catch (err) {
        res.statusCode = 422;
        res.send({ message: 'no products found' });
    }
});

ProductRouter.patch('/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const { title, details, category, price, imageUrl } = req.body;
        const editedProduct = await Product.updateOne({ _id }, { title, details, category, price, imageUrl });
        console.log(editedProduct);
        res.statusCode = 200;
        res.send({ editedProduct: editedProduct });
    } catch (err) {
        res.statusCode = 422;
        res.send({ message: 'edit failed' });
    }
});

module.exports = ProductRouter;