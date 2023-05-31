import {Router} from "express";
import {getEquipos, getEquipo, createEquipo, updateEquipo, deleteEquipo} from '../controllers/equipos.controller.js'

const router = Router()

router.get('/equipos', getEquipos)

router.get('/equipo/:id', getEquipo)

router.post('/equipo', createEquipo)

router.patch('/equipo/:id', updateEquipo)

router.delete('/equipo/:id', deleteEquipo)

export default router