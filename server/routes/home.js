const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/welcome', (req, res) => {
    res.render('welcome', { title: 'Главная страница' });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', authController.register);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login);


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
