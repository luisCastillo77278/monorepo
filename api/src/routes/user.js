const { Router } = require('express');
const { check } = require('express-validator');
const userControllers = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', userControllers.getUsers);
router.post('/', [
  check('username')
    .notEmpty()
    .withMessage('El campo es requerido')
    .bail(),
  check('name')
    .notEmpty()
    .withMessage('El campo es requerido')
    .bail(),
  check('password')
    .notEmpty()
    .withMessage('El campo es requerido')
    .bail()
    .isLength({ min: 8 })
    .withMessage('El password debe ser debe contener al menos 8 caracteres')
    .bail()
    .isStrongPassword()
    .withMessage('El password no es muy fuerte')
    .bail()
  ,
  validarCampos
], userControllers.create);

router.get('/:id', [
  check('id')
    .isMongoId()
    .withMessage('El id debe ser un id valido de mongo')
    .bail(),
  validarCampos
], userControllers.getUser);



module.exports = router;