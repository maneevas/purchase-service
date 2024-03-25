const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, ensureAdmin } = require('../../middleware/authMiddleware');

router.get('/', ensureAuthenticated, ensureAdmin, userController.view);
router.post('/', ensureAuthenticated, ensureAdmin, userController.find);
router.get('/adduser', ensureAuthenticated, ensureAdmin, userController.form);
router.post('/adduser', ensureAuthenticated, ensureAdmin, userController.create);
router.get('/edituser/:id', ensureAuthenticated, ensureAdmin, userController.edit);
router.post('/edituser/:id', ensureAuthenticated, ensureAdmin, userController.update);
router.get('/vieworder/:id', ensureAuthenticated, ensureAdmin, userController.vieworder);
router.get('/editorderadmin/:id', ensureAuthenticated, ensureAdmin, userController.editOrderAdmin);
router.post('/editorderadmin/:id', ensureAuthenticated, ensureAdmin, userController.updateOrderAdmin);
router.get('/:id', ensureAuthenticated, ensureAdmin, userController.delete);
router.get('/deleteorderadmin/:id', ensureAuthenticated, ensureAdmin, userController.deleteOrder);


module.exports = router;
