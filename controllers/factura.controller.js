const { request, response } = require('express')
const { Factura, User } = require('../models')
const { isObjectId } = require('../helpers')

const getFacturas = async (req = request, res = response) => {
  try {
    const query = { status: true }

    const [facturas, total] = await Promise.all([
      Factura.find(query).populate('user').populate('producto'),
      Factura.countDocuments(query),
    ])

    res.json({
      total,
      facturas,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}
const crearFactura = async (req = request, res = response) => {
  try {
    let { user: userId, productos: productosIds } = req.body

    if (!isObjectId(userId)) {
      return res.status(400).json({
        msg: 'Debe pasar un id demongo válido',
      })
    }
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({
        msg: `No existe un usuario con el is ${userId}`,
      })
    }

    productosIds.map((productosId, index) => {
      if (!isObjectId(productosId)) {
        return res.status(400).json({
          msg: 'Debe pasar un id de mongo válido - producto',
          index,
        })
      }
    })

    /*     const factura = new Factura(req.body) */
    /*     await factura.save() */

    res.status(201).json({
      /*       factura, */
      user,
      productos,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  getFacturas,
  crearFactura,
}
