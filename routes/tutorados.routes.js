import { Router } from 'express';
import bodyParser from 'body-parser';
import { tutoradosController } from '../controllers/tutorados.controller.js';

const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * @openapi
 * '/api/tutorados/view_dataT':
 *  get:
 *     tags:
 *     - tutorados
 *     summary: visualizar tutorados
 *     responses:
 *      200:
 *        description: view
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.get('/view_dataT', (req, res) => tutoradosController.TutoradosData_view(req, res));

/**
 * @openapi
 * '/api/tutorados/create_dataT':
 *  post:
 *     tags:
 *     - tutorados
 *     summary: Incio de Sesion
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - periodoEscolar
 *              - cuatrimestre
 *              - grupo
 *              - hombresTA
 *              - mujeresTA
 *              - hombresAtendidos
 *              - mujeresAtendidos
 *              - resuelto
 *              - canalizacion
 *              - casosTutor
 *              - casosCanaliacion
 *            properties:
 *              periodoEscolar:
 *                type: string
 *                default: sep-dic
 *              cuatrimestre:
 *                type: string
 *                default: 5
 *              grupo:
 *                type: string
 *                default: a
 *              hombresTA:
 *                type: string
 *                default: 1
 *              mujeresTA:
 *                type: string
 *                default: 2
 *              hombresAtendidos:
 *                type: string
 *                default: 3
 *              mujeresAtendidos:
 *                type: string
 *                default: 4
 *              resuelto:
 *                type: string
 *                default: 5
 *              canalizacion:
 *                type: string
 *                default: 6
 *              casosTutor:
 *                type: string
 *                default: 7
 *              casosCanaliacion:
 *                type: string
 *                default: 8
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post('/create_dataT', (req, res) => tutoradosController.TutoradosData_create(req, res));

/**
 * @openapi
 * '/api/tutorados/delete_dataT':
 *  delete:
 *     tags:
 *     - tutorados
 *     summary: eliminar tutorados
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *                default: id
 *     responses:
 *      200:
 *        description: delete
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.delete('/delete_dataT', (req, res) => tutoradosController.TutoradosData_delete(req, res));

/**
 * @openapi
 * '/api/tutorados/update_dataT':
 *  put:
 *     tags:
 *     - tutorados
 *     summary: actualizar
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - periodoEscolar
 *              - cuatrimestre
 *              - grupo
 *              - hombresTA
 *              - mujeresTA
 *              - hombresAtendidos
 *              - mujeresAtendidos
 *              - resuelto
 *              - canalizacion
 *              - casosTutor
 *              - casosCanaliacion
 *            properties:
 *              id:
 *                type: string
 *                default: id
 *              periodoEscolar:
 *                type: string
 *                default: sep-dic
 *              cuatrimestre:
 *                type: string
 *                default: 5
 *              grupo:
 *                type: string
 *                default: a
 *              hombresTA:
 *                type: string
 *                default: 1
 *              mujeresTA:
 *                type: string
 *                default: 2
 *              hombresAtendidos:
 *                type: string
 *                default: 3
 *              mujeresAtendidos:
 *                type: string
 *                default: 4
 *              resuelto:
 *                type: string
 *                default: 5
 *              canalizacion:
 *                type: string
 *                default: 6
 *              casosTutor:
 *                type: string
 *                default: 7
 *              casosCanaliacion:
 *                type: string
 *                default: 8
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.put('/update_dataT', (req, res) => tutoradosController.TutoradosData_update(req, res));


 export default router;