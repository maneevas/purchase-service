const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//static stuff
app.use(express.static('public'));

//templating engine
app.engine('hbs', exphbs.engine( {extname: '.hbs' }));
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

app.get('/welcome', (req, res) => {
    res.render('welcome');
});


const userRoutes = require('./server/routes/user')
app.use('/dashboard', userRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));