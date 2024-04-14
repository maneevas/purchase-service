console.log(`Current directory: ${process.cwd()}`);

import express from 'express'
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser'
import mysql from 'mysql2/promise';
import cookieParser from 'cookie-parser'
import passport from 'passport'
import expressSession from 'express-session'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '.env') });

import {register,login,view,find,form,create,edit,update,deleteUser,vieworder,myorders,findOrders,formOrder,createOrder,editOrder,updateOrder,editOrderAdmin,updateOrderAdmin,deleteOrder} from './vendor/db.js'

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


// routes

const router = express.Router();

router.get('/', (req, res) => {
    res.render('welcome', { title: 'Главная страница' });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', register);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', login);

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
});

router.get('/dashboard', ensureAuthenticated, ensureAdmin, view);
router.post('/dashboard', ensureAuthenticated, ensureAdmin, find);
router.get('/dashboard/adduser', ensureAuthenticated, ensureAdmin, form);
router.post('/dashboard/adduser', ensureAuthenticated, ensureAdmin, create);
router.get('/dashboard/edituser/:id', ensureAuthenticated, ensureAdmin, edit);
router.post('/dashboard/edituser/:id', ensureAuthenticated, ensureAdmin, update);
router.get('/dashboard/vieworder/:id', ensureAuthenticated, ensureAdmin, vieworder);
router.get('/dashboard/editorderadmin/:id', ensureAuthenticated, ensureAdmin, editOrderAdmin);
router.post('/dashboard/editorderadmin/:id', ensureAuthenticated, ensureAdmin, updateOrderAdmin);
router.get('/dashboard/:id', ensureAuthenticated, ensureAdmin, deleteUser);
router.get('/dashboard/deleteorderadmin/:id', ensureAuthenticated, ensureAdmin, deleteOrder);

router.get('/myorders', ensureAuthenticated, ensureUser, myorders);
router.post('/myorders', ensureAuthenticated, ensureUser, findOrders);
router.get('/myorders/addorder', ensureAuthenticated, ensureUser, formOrder);
router.post('/myorders/addorder', ensureAuthenticated, ensureUser, createOrder);
router.get('/myorders/editorder/:id', ensureAuthenticated, ensureUser, editOrder);
router.post('/myorders/editorder/:id', ensureAuthenticated, ensureUser, updateOrder);

app.use('/', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
