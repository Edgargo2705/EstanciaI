import { Router } from 'express';
import bodyParser from 'body-parser';
import { userController } from '../controllers/user.controller.js';

const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @openapi
 * '/api/users/create':
 *  post:
 *     tags:
 *     - users
 *     summary: Incio de Sesion
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - usuario
 *              - email
 *              - Password
 *            properties:
 *              usuario:
 *                type: string
 *                default: cdiaz
 *              email:
 *                type: string
 *                default: cdiaz@ids.upchiapas.edu.mx
 *              Password:
 *                type: string
 *                default: cdiaz@
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */


router.post('/create', (req, res) => userController.user_create(req, res));

/**
 * @openapi
 * '/api/users/login':
 *  post:
 *     tags:
 *     - users
 *     summary: Incio de Sesion
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - Password
 *            properties:
 *              email:
 *                type: string
 *                default: cdiaz@ids.upchiapas.edu.mx
 *              Password:
 *                type: string
 *                default: cdiaz@
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post('/login', (req, res) =>userController.user_login(req, res));

/**
 * @openapi
 * '/api/users/update_Password':
 *  put:
 *     tags:
 *     - users
 *     summary: update password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - Password
 *            properties:
 *              email:
 *                type: string
 *                default: cdiaz@ids.upchiapas.edu.mx
 *              Password:
 *                type: string
 *                default: cdiaz12@
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

 router.put('/update_Password', (req, res) => userController.user_update(req, res));


export default router;