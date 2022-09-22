import { Router } from 'express';
import bodyParser from 'body-parser';
import { alumnosController } from '../controllers/Alumnos.controller.js';

const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @openapi
 * '/api/alumnos/create_estudiantes':
 *  post:
 *     tags:
 *     - Estudiantes
 *     summary: Crear alumno
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - matricula
 *              - apellidoP
 *              - apellidoM
 *              - nombres
 *              - sexo
 *            properties:
 *              matricula:
 *                type: string
 *                default: 211111
 *              apellidoP:
 *                type: string
 *                default: Gomez
 *              apellidoM:
 *                type: string
 *                default: cota
 *              nombres:
 *                type: string
 *                default: Edgar
 *              sexo:
 *                type: string
 *                default: hombre
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */


router.post('/create_estudiantes', (req, res) => alumnosController.estudiantes_create(req, res));

/**
 * @openapi
 * '/api/alumnos/view_estudiantes':
 *  get:
 *     tags:
 *     - Estudiantes
 *     summary: visualizar Estudiantes
 *     responses:
 *      200:
 *        description: view
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.get('/view_estudiantes', (req,res) => alumnosController.estudiantes_view(req,res));

/**
 * @openapi
 * '/api/alumnos/update_estudiantes':
 *  put:
 *     tags:
 *     - Estudiantes
 *     summary: Actualizar Estudiantes
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - matricula
 *              - apellidoP
 *              - apellidoM
 *              - nombres
 *              - sexo
 *            properties:
 *              id:
 *                type: UUID
 *                default: id
 *              matricula:
 *                type: string
 *                default: 211111
 *              apellidoP:
 *                type: string
 *                default: Gomez
 *              apellidoM:
 *                type: string
 *                default: cota
 *              nombres:
 *                type: string
 *                default: Edgar
 *              sexo:
 *                type: string
 *                default: hombre
 *     responses:
 *      200:
 *        description: Update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.put('/update_estudiantes', (req,res) => alumnosController.estudiantes_update(req,res));

/**
 * @openapi
 * '/api/alumnos/delete_estudiantes':
 *  delete:
 *     tags:
 *     - Estudiantes
 *     summary: eliminar Estudiantes
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            required:
 *              -id
 *            properties:
 *              id:
 *                type: UUID
 *                default: id
 *     responses:
 *      200:
 *        description: delete
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.delete('/delete_estudiantes', (req,res) => alumnosController.estudiantes_delete(req,res));

export default router;