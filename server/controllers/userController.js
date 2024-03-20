const mysql2 = require('mysql2');

//connection pool
const pool = mysql2.createPool({
    connectionLimit : 100,
    host            : process.env.host,
    user            : process.env.user,
    password        : process.env.password,
    database        : process.env.database
});

//view users
exports.view = (req, res) => {

//connect to db
pool.getConnection((err, connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID' + connection.threadId);
    //user the connection
    connection.query('SELECT * FROM users', (err, rows) => {
        //when done with the connection, release it
        connection.release();
        if(!err) {
            let removedUser = req.query.removed;
            res.render('dashboard', { rows, removedUser });
        } else {
            console.log(err);
        }
        console.log('The data from users table: \n', rows)
    });
});
}

//find user by search
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        let searchTerm = req.body.search;
        //user the connection
        connection.query('SELECT * from users WHERE surname LIKE ? OR location LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render('dashboard', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows)
        });
    });
    }

    exports.form = (req, res) => {
        res.render('add-user');
    }


    //add new user
    exports.create = (req, res) => {
    const { surname, name, patname, location, email, password} = req.body;


    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        //user the connection
        connection.query('INSERT  INTO users SET surname = ?, name = ?, patname = ?, location = ?, email = ?, password = ?',[surname, name, patname, location, email, password],(err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render('add-user', { alert: 'Пользователь успешно создан!' });
            } else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows)
        });
    });
}

 //edit user
 exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        //user the connection

        connection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render('edit-user', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows)
        });
    });
 }

 //update user
exports.update = (req, res) => {
    const { surname, name, patname, location, email, password} = req.body;
  
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        //user the connection
  
        connection.query('UPDATE users SET surname = ?, name = ?, patname =?, location = ?, email = ?, password = ? WHERE id = ?',[surname, name, patname, location, email, password, req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
  
            if(!err) {
  
                pool.getConnection((err, connection) => {
                    if(err) throw err; //not connected!
                    console.log('Connected as ID' + connection.threadId);
                    //user the connection
            
                    connection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows) => {
                        //when done with the connection, release it
                        connection.release();
                        if(!err) {
                            res.render('edit-user', { rows, alert: 'Данные о пользователе успешно обновлены' });
                        } else {
                            console.log(err);
                        }
                        console.log('The data from users table: \n', rows)
                    });
                });
  
            } else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows)
        });
    });
  }
  
   //delete user
 exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);

        //user the connection
        connection.query('DELETE FROM users WHERE id = ?',[req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                let removedUser = encodeURIComponent('Пользователь успешно удален.')
                res.redirect('/dashboard?removed=' + removedUser);
            } else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows)
        });
    });
 }

 //view users
exports.viewall = (req, res) => {
    //connect to db
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        //user the connection
        connection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render('view-user', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows)
        });
    });
    }