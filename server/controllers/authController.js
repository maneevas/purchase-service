const mysql2 = require('mysql2');

//connection pool
const pool = mysql2.createPool({
    connectionLimit : 100,
    host            : process.env.host,
    user            : process.env.user,
    password        : process.env.password,
    database        : process.env.database
});

//register
exports.register = (req, res) => {
    const { surname, name, patname, location, email, password } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
        connection.query('INSERT INTO users SET surname = ?, name = ?, patname = ?, location = ?, email = ?, password = ?', [surname, name, patname, location, email, password], (err, rows) => {
            connection.release();
            if(!err) {
                res.render('login', { alert: 'Пользователь успешно создан! Теперь вы можете войти.' });
            } else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows);
        });
    });
};

//login
exports.login = (req, res) => {
    const { email, password } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
        connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, rows) => {
            if(!err) {
                if(rows.length > 0) {
                    req.session.isAuthenticated = true;
                    connection.query('SELECT * FROM users', (err, userRows) => {
                        connection.release();
                        if (!err) {
                            res.render('dashboard', { alert: 'Вы успешно вошли!', rows: userRows });
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    connection.release();
                    res.render('login', { alert: 'Неверный email или пароль.' });
                }
            } else {
                connection.release();
                console.log(err);
            }
        });
    });
};

