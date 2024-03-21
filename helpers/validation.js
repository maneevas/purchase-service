const { check } = require('express-validator');

exports.signUpValidation = [
    check('surname', 'Это поле обязательно для заполнения').not().isEmpty(),
    check('name', 'Это поле обязательно для заполнения').not().isEmpty(),
    check('patname', 'Это поле обязательно для заполнения').not().isEmpty(),
    check('email', 'Введите корректный email').isEmail().normalizeEmail({ gmail_remove_dots:true }),
    check('password', 'Введите корректиный пароль').isLength({ min:6 })
];
