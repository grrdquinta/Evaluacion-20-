import express from 'express'
import reservaController from '../controller/reservaController.js'
const router = express.Router()

router.route('/')
   .get(reservaController.getReservas)
   .post(reservaController.createReserva)

router.route('/:id')
   .get(reservaController.getReservaById)
   .put(reservaController.updateReserva)
   .delete(reservaController.deleteReserva)
export default router