const { Router } = require('express');
const { check } = require('express-validator');
const blogControllers = require('../controllers/blog');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', blogControllers.getBlogs);
router.post('/', [
  validarJWT,
  check('author')
    .notEmpty()
    .withMessage('El campo es requerido')
    .bail(),
  check('likes')
    .notEmpty()
    .withMessage('El campo es requerido')
    .bail()
    .isInt()
    .withMessage('El valor debe ser un entero')
    .bail(),
  check('title')
    .notEmpty()
    .withMessage('El campo es requerido')
    .bail(),
  check('url')
    .notEmpty()
    .withMessage('El campo es requerido')
    .bail(),
  validarCampos
], blogControllers.create);

router.get('/:id', blogControllers.getBlog);
router.put('/:id', [
  check('id')
    .isMongoId()
    .withMessage('El elemento debe ser un id valido de mongo')
    .bail(),
  check('likes')
    .notEmpty()
    .withMessage('El campo es requerido')
    .bail(),
  validarCampos
], blogControllers.update);

router.delete('/:id', [
  validarJWT,
  check('id')
    .isMongoId()
    .withMessage('El elemento debe ser un id valido de mongo')
    .bail(),
  validarCampos
], blogControllers.delete);


module.exports = router;