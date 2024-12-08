const route = require("express").Router();
const rssValidation = require("./rss.validation");
const rssController = require("./rss.controller");
const { validation } = require("../../middleware/errorhandler");

/**
 * @swagger
 * tags: Rss
 * components:
 *  schemas:
 *    Rss:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: primary key int unsigned
 *        link:
 *          type: string
 *          description: rss link
 *        title:
 *          type: string
 *          description: title
 *        description:
 *          type: string
 *          description: description
 *        pubdate:
 *          type: string
 *          description: 22/05/2024
 *        createdAt:
 *          type: string
 *          description: auto generated date time
 *        updatedAt:
 *          type: string
 *          description: auto generated date time
 */

/**
 * @swagger
 * paths:
 *  /api/rss:
 *    get:
 *      operationId: rss
 *      summary: get rss
 *      tags: [Rss]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: number
 *        - in: query
 *          name: size
 *          schema:
 *            type: number
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The list of rss
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rss'
 */
route.get("/rss", rssController.index);

/**
 * @swagger
 * paths:
 *  /api/rss/pubdate:
 *    get:
 *      operationId: rss_pub_date
 *      summary: get rss pub date
 *      tags: [Rss]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: number
 *        - in: query
 *          name: size
 *          schema:
 *            type: number
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The list of rss
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rss'
 */
route.get("/rss/pubdate", rssController.distinctPubDate);

module.exports = route;