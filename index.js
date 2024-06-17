console.log(`Current directory: ${process.cwd()}`);

import express from 'express'
import exphbs from 'express-handlebars'
import mysql from 'mysql2/promise';
import passport from 'passport'
import expressSession from 'express-session'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import bodyParser from 'body-parser';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '.env') });

import {register,login,view,find,form,create,edit,update,deleteUser,viewall,viewarchive,vieworder,myorders,findOrders,findOrdersAdmin,updateOrderStatus,formOrder,createOrder,editOrder,updateOrder,editOrderAdmin,updateOrderAdmin,deleteOrder} from './vendor/db.js'

const app = express();
app.use(expressSession({
    secret: 'catloaf11111',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
const port = process.env.PORT || 5000;

// parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import { body, validationResult } from 'express-validator';

//static stuff
app.use(express.static('public'));

//templating engine
const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
        eq: function (v1, v2) {
            return v1 === v2;
        },
        formatDate: function (dateString) {
            if (!dateString) {
                return ''; 
            }
            let date = new Date(dateString);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
    },
});

hbs.handlebars.registerHelper('ifeq', function(a, b, options) {
    if (a == b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views','views');

//connection pool
export const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.host,
    user            : process.env.user,
    password        : process.env.password,
    database        : process.env.database
});

//connect to db
pool.getConnection((err, connection) => {
    if(err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected as ID' + connection.threadId);
});

//is auth
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.user ? true : false;
    console.log('isAuthenticated:', res.locals.isAuthenticated);
    next();
});

export function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
}

export function ensureAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.is_admin) {
        console.log('User is admin');
        return next();
    }
    res.redirect('/not-authorized');
}

export function ensureUser(req, res, next) {
    if (req.session && req.session.user && req.session.user.is_admin === 0) {
        return next();
    }
    res.redirect('/not-authorized');
}

//function for redirecting when somebody tries to access register or login pages while being authorized
function redirectIfAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
}
// routes

app.get('/', (req, res) => {
    res.render('welcome', { title: 'Главная страница', user: req.session.user });
});

app.get('/register', redirectIfAuthenticated, (req, res) => {
    res.render('register', { title: 'Регистрация' });
});

app.post('/register', register);

app.get('/login', redirectIfAuthenticated, (req, res) => {
    res.render('login', { title: 'Вход' });
});

app.post('/login',
    body('password').isLength({ min: 6 }).withMessage('Пароль должен содержать не менее 6 символов!'),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMsg = errors.array().map(e => e.msg).join(', ');

            return res.render('login', {
                title: 'Вход',
                alert: errorMsg
            });
        }

        login(req, res);
    });


app.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
});

app.get('/dashboard', ensureAuthenticated, ensureAdmin, view);
app.post('/dashboard', ensureAuthenticated, ensureAdmin, find);
app.get('/dashboard/adduser', ensureAuthenticated, ensureAdmin, form);
app.post('/dashboard/adduser', ensureAuthenticated, ensureAdmin, create);
app.get('/dashboard/edituser/:id', ensureAuthenticated, ensureAdmin, edit);
app.post('/dashboard/edituser/:id', ensureAuthenticated, ensureAdmin, update);
app.get('/dashboard/vieworder/:id', ensureAuthenticated, ensureAdmin, vieworder);
app.get('/dashboard/:id', ensureAuthenticated, ensureAdmin, deleteUser);

app.get('/ordersarchive', ensureAuthenticated, ensureAdmin, viewarchive);

app.get('/manageorders', ensureAuthenticated, ensureAdmin, viewall);
app.post('/manageorders', ensureAuthenticated, ensureAdmin, findOrdersAdmin);
app.get('/manageorders/editorderadmin/:id', ensureAuthenticated, ensureAdmin, editOrderAdmin);
app.post('/manageorders/editorderadmin/:id', ensureAuthenticated, ensureAdmin, updateOrderAdmin);
app.post('/updateOrderStatus/:id', ensureAuthenticated, ensureAdmin, updateOrderStatus);
app.get('/manageorders/deleteorderadmin/:id', ensureAuthenticated, ensureAdmin, deleteOrder);

app.get('/myorders', ensureAuthenticated, ensureUser, myorders);
app.post('/myorders', ensureAuthenticated, ensureUser, findOrders);
app.get('/myorders/addorder', ensureAuthenticated, ensureUser, formOrder);
app.post('/myorders/addorder', ensureAuthenticated, ensureUser, createOrder);
app.get('/myorders/editorder/:id', ensureAuthenticated, ensureUser, editOrder);
app.post('/myorders/editorder/:id', ensureAuthenticated, ensureUser, updateOrder);

app.listen(port, () => console.log(`Listening on port ${port}`));
