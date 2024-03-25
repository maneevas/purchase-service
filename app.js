const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const passport = require('passport');
const expressSession = require('express-session');

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
            let date = new Date(dateString);
            let day = date.getDate();
            let month = date.getMonth() + 1; // Месяцы начинаются с 0
            let year = date.getFullYear();
            return `${day}/${month}/${year}`;
    },
},
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//connection pool
const pool = mysql2.createPool({
    connectionLimit : 100,
    host            : process.env.host,
    user            : process.env.user,
    password        : process.env.password,
    database        : process.env.database
});

//connect to db
pool.getConnection((err, connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID' + connection.threadId);
});

//is auth
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.user ? true : false;
    next();
});

const homeRoutes = require('./server/routes/home');
app.use('/', homeRoutes);

const userRoutes = require('./server/routes/userRoute');
app.use('/dashboard', userRoutes);

const userRoutes2 = require('./server/routes/userRoute2');
app.use('/', userRoutes2);

app.listen(port, () => console.log(`Listening on port ${port}`));
