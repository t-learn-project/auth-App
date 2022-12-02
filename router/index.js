const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();

router.post("/login", userController.login);
router.post("/activate", userController.activate);
router.post("/logout", userController.logout);
router.post("/refresh", userController.refresh);

/**
 * @swagger
 * components:
 *   schemas:
 *     EmailShema:
 *       type: object
 *       required:
 *         - email        
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *       example:
 *         email: test@tinkoff.ru
 */
/**
 * 
 * @swagger
 * components:
 *   schemas:
 *     SuccessSchema:
 *       type: object
 *       required:
 *        responses:
 *         description:Успешно       
 *       example:         
 *         Успешно
 */
/**
 * @swagger
 * tags:
 *   name: JWT Auth API
 */
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User authorization
 *     tags: [JWT Auth API]      
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailShema'
 *     responses:
 *       200:
 *         description: User has successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessSchema'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *    ActivateShema:
 *       type: object
 *       required:
 *         - activationLink        
 *       properties:        
 *        activationLink:
 *           type: string
 *       example:
 *         activationLink: "130430"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *    SuccessActivationShema :
 *       type: object
 *       required:
 *         - accessToken       
 *         - refreshToken       
 *         - user       
 *         - email       
 *         - id       
 *         - isActivated       
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The user access token
 *         refreshToken:
 *           type: string
 *           description: The user refresh token
 *         user:
 *           type: object 
 *            email id isActivated
 *         email:
 *           type: string
 *           description: The user email
 *         id:
 *           type: number
 *           description: The user id
 *         isActivated:
 *           type: boolean
 *           description: The user state
 *       example:         
 *         accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  "
 *         refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  "
 *         user: {"email":"test@tinkoff.ru", "id":"4", "isActivated":true}
 */
/**
 * @swagger
 * /api/activate:
 *   post:
 *     summary: activate user
 *     tags: [JWT Auth API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivateShema'
 *     responses:
 *       200:
 *         description: account successfully activated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessActivationShema'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: logOut user
 *     tags: [JWT Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenShema'
 *     responses:
 *       200:
 *         description: account successfully logout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessSchema'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /api/refresh:
 *   post:
 *     summary: refresh user token
 *     tags: [JWT Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenShema'
 *     responses:
 *       200:
 *         description: account successfully activated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessActivationShema'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *    RefreshTokenShema :
 *       type: object
 *       required:
 *         - refreshToken       
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: The user refresh token
 *       example:         
 *         refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  "
 */
module.exports = router;
