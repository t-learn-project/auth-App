const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);


router.post('/login', userController.login);
router.post('/logout', userController.logout);


// этот запрос должен приходить с клиента пост запросом в параметрах закинуть "activationLink":"66062" код берется с того что приходит на почту 
router.post('/activate', userController.activate);

router.get('/refresh', userController.refresh);
router.get('/users',authMiddleware,  userController.getUsers);

module.exports = router