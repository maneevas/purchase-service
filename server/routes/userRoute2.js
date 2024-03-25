const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, ensureUser } = require('../../middleware/authMiddleware');

router.get('/myorders', ensureAuthenticated, ensureUser, userController.myorders);
router.post('/myorders', ensureAuthenticated, ensureUser, userController.findOrders);
router.get('/myorders/addorder', ensureAuthenticated, ensureUser, userController.formOrder);
router.post('/myorders/addorder', ensureAuthenticated, ensureUser, userController.createOrder);
router.get('/myorders/editorder/:id', ensureAuthenticated, ensureUser, userController.editOrder);
router.post('/myorders/editorder/:id', ensureAuthenticated, ensureUser, userController.updateOrder);

module.exports = router;
