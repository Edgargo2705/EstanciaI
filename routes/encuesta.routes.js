import { Router } from 'express';
import bodyParser from 'body-parser';
import { encuestaController } from '../controllers/encuesta.controller.js';

const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @openapi
 * '/api/encuesta/view_preguntas':
 *  get:
 *     tags:
 *     - encuesta
 *     summary: visualizar encuesta
 *     responses:
 *      200:
 *        description: view
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.get('/view_preguntas', (req, res) => encuestaController.preguntas_view(req, res));


/**
 * @openapi
 * '/api/encuesta/create_preguntas':
 *  post:
 *     tags:
 *     - encuesta
 *     summary: encuesta
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - pregunta_1
 *              - pregunta_2
 *              - pregunta_3
 *              - pregunta_4
 *            properties:
 *              pregunta_1:
 *                type: string
 *                default: si
 *              pregunta_2:
 *                type: string
 *                default: no
 *              pregunta_3:
 *                type: string
 *                default: no
 *              pregunta_4:
 *                type: string
 *                default: si
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */


router.post('/create_preguntas', (req, res) => encuestaController.preguntas_create(req, res));

/**
 * @openapi
 * '/api/encuesta/delete_preguntas':
 *  delete:
 *     tags:
 *     - encuesta
 *     summary: eliminar encuesta
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

router.delete('/delete_preguntas', (req, res) => encuestaController.preguntas_delete(req, res));

/**
 * @openapi
 * '/api/encuesta/update_preguntas':
 *  put:
 *     tags:
 *     - encuesta
 *     summary: encuesta
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - pregunta_1
 *              - pregunta_2
 *              - pregunta_3
 *              - pregunta_4
 *            properties:
 *              id:
 *                type: UUID
 *                default: id
 *              pregunta_1:
 *                type: string
 *                default: si
 *              pregunta_2:
 *                type: string
 *                default: no
 *              pregunta_3:
 *                type: string
 *                default: no
 *              pregunta_4:
 *                type: string
 *                default: si
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.put('/update_preguntas', (req, res) => encuestaController.preguntas_update(req, res));


export default router;