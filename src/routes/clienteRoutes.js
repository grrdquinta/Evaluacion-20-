import express from 'express'
import clienteController from '../controller/clienteController.js'
const router = express.Router()

router.route('/')
   .get(clienteController.getClients)
   .post(clienteController.createClient)

router.route('/:id')
   .get(clienteController.getClientById)
   .put(clienteController.updateClient)
   .delete(clienteController.deleteClient)
export default router