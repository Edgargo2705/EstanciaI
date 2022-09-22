import { Router } from "express";
import bodyParser from "body-parser";
import { atencionController } from "../controllers/atencion.controller.js";

const router = Router();
const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * @openapi
 * '/api/atencion/view_data':
 *  get:
 *     tags:
 *     - atencion
 *     summary: visualizar atencion
 *     responses:
 *      200:
 *        description: view
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.get("/view_data", (req, res) => atencionController.AtencionData_view(req, res));

/**
 * @openapi
 * '/api/atencion/create_data':
 *  post:
 *     tags:
 *     - atencion
 *     summary: Incio de Sesion
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - numTR
 *              - numTRiesgo
 *              - numTCO
 *              - numBajaD
 *              - EBTemporal
 *            properties:
 *              numTR:
 *                type: string
 *                default: 1
 *              numTRiesgo:
 *                type: string
 *                default: 2
 *              numTCO:
 *                type: string
 *                default: 3
 *              numBajaD:
 *                type: string
 *                default: 3
 *              EBTemporal:
 *                type: string
 *                default: 3
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */


 router.post("/create_data", (req, res) => atencionController.AtencionData_create(req, res));

/**
 * @openapi
 * '/api/atencion/delete_data':
 *  delete:
 *     tags:
 *     - atencion
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


 router.delete("/delete_data", (req, res) => atencionController.AtencionData_delete(req, res));

/**
 * @openapi
 * '/api/atencion/update_data':
 *  put:
 *     tags:
 *     - atencion
 *     summary: actualizar atencion
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - numTR
 *              - numTRiesgo
 *              - numTCO
 *              - numBajaD
 *              - EBTemporal
 *            properties:
 *              id:
 *                type: UUID
 *                default: id
 *              numTR:
 *                type: string
 *                default: 1
 *              numTRiesgo:
 *                type: string
 *                default: 2
 *              numTCO:
 *                type: string
 *                default: 3
 *              numBajaD:
 *                type: string
 *                default: 3
 *              EBTemporal:
 *                type: string
 *                default: 3
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

 router.put("/update_data", (req, res) => atencionController.AtencionData_update(req, res));


 export default router;