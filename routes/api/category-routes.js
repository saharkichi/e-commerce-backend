const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{ model: Product }]
  }).then(categories => res.status(200).json(categories));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id,{
    include: [{model: Product}]
  }).then(category => res.status(200).json(category));
});


router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  }).then(newCategory => res.status(200).json(newCategory))
    .catch(err => res.json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },{where: {id: req.params.id}}).then(updatedCategory => res.status(200).json(updatedCategory))
    .catch(err => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: { id :req.params.id }})
    .then(deletedCategory => res.status(200).json(deletedCategory))
    .catch(err => res.json(err));
});

module.exports = router;
