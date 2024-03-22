const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');
const { ensureAuthenticated, ensureAdmin } = require('../../middleware/authMiddleware');


router.get('/', (req, res) => {
    res.render('index', { title: 'Главная страница' });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', userController.register);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', userController.login);

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
});



module.exports = router;
