const { Router } = require('express')
const { check } = require('express-validator')

const {
  crearFactura,
  getFacturas,
} = require('../controllers/factura.controller')
const { userByIdExists } = require('../helpers/db-validators')

const { validateFields, validateJWT } = require('../middlewares')
const { exists } = require('../models/category')

const router = Router()

router.get('/', getFacturas)

router.post(
  '/',
  [
    check('user', 'El usuario es requrido').not().isEmpty(),
    check('productos', 'Debe ser una array de ids de productos').isArray(),
    check('productos', 'Debe haber mínimo un producto')
      .isArray()
      .isLength({ min: 1 }),
    validateFields,
  ],
  crearFactura
)

module.exports = router
