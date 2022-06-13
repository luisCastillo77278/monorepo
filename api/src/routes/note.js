const { Router } = require('express');
const { check } = require('express-validator');
const noteControllers = require('../controllers/note');

const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', noteControllers.getNotes);

router.post('/', [
  validarJWT,
  check('content')
    .notEmpty()
    .withMessage('El campo es requerido')
    .bail(),
  check('important')
    .notEmpty()
    .withMessage('El campo es requerido')
    .bail(),
  validarCampos
], noteControllers.create);

router.get('/:id', [
  check('id')
    .isMongoId()
    .withMessage('El id deve de tener la estructura de mongo')
    .bail(),
  validarCampos
], noteControllers.getNote);

router.put('/:id', [
  check('id')
    .isMongoId()
    .withMessage('El id debe de tener una estructura de mogon')
    .bail(),
  validarCampos
], noteControllers.update);


router.delete('/:id', [
  check('id')
    .isMongoId()
    .withMessage('El id deve de tener la estructura de mongo')
    .bail(),
  validarCampos
], noteControllers.delete);


module.exports = router;