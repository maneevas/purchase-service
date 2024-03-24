const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, ensureAdmin } = require('../../middleware/authMiddleware');

//create, find, update, delete
router.get('/', ensureAuthenticated, ensureAdmin, userController.view);
router.post('/', ensureAuthenticated, ensureAdmin, userController.find);
router.get('/adduser', ensureAuthenticated, ensureAdmin, userController.form);
router.post('/adduser', ensureAuthenticated, ensureAdmin, userController.create);
router.get('/edituser/:id', ensureAuthenticated, ensureAdmin, userController.edit);
router.post('/edituser/:id', ensureAuthenticated, ensureAdmin, userController.update);
router.get('/viewuser/:id', ensureAuthenticated, ensureAdmin, userController.viewall);
router.get('/:id', ensureAuthenticated, ensureAdmin, userController.delete);

module.exports = router;
