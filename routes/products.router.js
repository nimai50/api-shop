const express = require('express');

const ProductsService = require('./../services/product.services');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schemas');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  return res.json(products);
});

router.get('/filter', (req, res) => {
  return res.send('Yo soy un filter')
});


router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {

      const { id } = req.params;
      const product = await service.findOne(id);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    return res.status(201).json(newProduct);
  });

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await service.delete(id);
  return res.json(answer);
});
module.exports = router;
