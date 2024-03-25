const mysql2 = require('mysql2');

//connection pool
const pool = mysql2.createPool({
    connectionLimit : 100,
    host            : process.env.host,
    user            : process.env.user,
    password        : process.env.password,
    database        : process.env.database
});

exports.view = (req, res) => {
    //connect to db
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        //use the connection
        connection.query('SELECT users.*, COUNT(orders.id) as order_count FROM users LEFT JOIN orders ON users.id = orders.author_id WHERE users.is_admin = 0 GROUP BY users.id', (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                let removedUser = req.query.removed;
                res.render('dashboard', { rows, removedUser, isAuthenticated: req.session.isAuthenticated });
            } else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows)
        });
    });
};
    

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
                let removedMessage = encodeURIComponent('Пользователь успешно удален.')
                res.redirect('/dashboard?removed=' + removedMessage);
            } else {
                console.log(err);
            }
            console.log('The data from users table: \n', rows)
        });
    });
 }

 //view specific orders
 exports.vieworder = (req, res) => {
    //connect to db
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        //user the connection
        connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, userRows) => {
            if(err) {
                console.log(err);
                connection.release();
                return;
            }
            console.log('The data from users table: \n', userRows);

            connection.query('SELECT * FROM orders WHERE author_id = ?', [req.params.id], (err, orderRows) => {
                //when done with the connection, release it
                connection.release();
                if(!err) {
                    res.render('view-order', { user: userRows[0], orders: orderRows });
                } else {
                    console.log(err);
                }
                console.log('The data from orders table: \n', orderRows);
            });
        });
    });
};


    //users orders
    exports.myorders = (req, res) => {
        res.render('myorders', { user: req.session.user });
    };
    
    //view orders
exports.myorders = (req, res) => {

    //connect to db
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        //user the connection
        connection.query('SELECT * FROM orders WHERE author_id = ?', [req.session.user.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render('myorders', { rows, isAuthenticated: req.session.isAuthenticated });
            } else {
                console.log(err);
            }
            console.log('The data from orders table: \n', rows)
        });
    });
};

//find order by search
exports.findOrders = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
        let searchTerm = req.body.search;
        connection.query('SELECT * FROM orders WHERE author_id = ? AND good LIKE ?', [req.session.user.id, '%' + searchTerm + '%'], (err, rows) => {
            connection.release();
            if(!err) {
                res.render('myorders', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from orders table: \n', rows)
        });
    });
};

exports.formOrder = (req, res) => {
    res.render('add-order');
}

//add new order
exports.createOrder = (req, res) => {
    const { good, quantity, link, from, before } = req.body;
    const author_id = req.session.user.id;

    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
        //use the connection
        connection.query('INSERT INTO orders SET good = ?, quantity = ?, link = ?, `from` = ?, `before` = ?, author_id = ?', [good, quantity, link, from, before, author_id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render('add-order', { alert: 'Заказ успешно создан!' });
            } else {
                console.log(err);
            }
            console.log('The data from orders table: \n', rows)
        });
    });
};

//edit order
exports.editOrder = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        //user the connection

        connection.query('SELECT * FROM orders WHERE id = ?',[req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render('edit-order', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from orders table: \n', rows)
        });
    });
}

//update order
exports.updateOrder = (req, res) => {
    const { good, quantity, link, from, before } = req.body;
  
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        //user the connection
  
        connection.query('UPDATE orders SET good = ?, quantity = ?, link =?, `from` = ?, `before` = ? WHERE id = ?',[good, quantity, link, from, before, req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
  
            if(!err) {
  
                pool.getConnection((err, connection) => {
                    if(err) throw err; //not connected!
                    console.log('Connected as ID' + connection.threadId);
                    //user the connection
            
                    connection.query('SELECT * FROM orders WHERE id = ?',[req.params.id], (err, rows) => {
                        //when done with the connection, release it
                        connection.release();
                        if(!err) {
                            res.render('edit-order', { rows, alert: 'Данные о заказе успешно обновлены' });
                        } else {
                            console.log(err);
                        }
                        console.log('The data from orders table: \n', rows)
                    });
                });
  
            } else {
                console.log(err);
            }
            console.log('The data from orders table: \n', rows)
        });
    });
}

//edit order admin
exports.editOrderAdmin = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        //user the connection

        connection.query('SELECT * FROM orders WHERE id = ?',[req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render('edit-order-admin', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from orders table: \n', rows)
        });
    });
}

//update order admin
exports.updateOrderAdmin = (req, res) => {
    const { quantity, link, status } = req.body;
  
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);
        //user the connection
  
        connection.query('UPDATE orders SET quantity = ?, link =?, status = ? WHERE id = ?',[quantity, link, status, req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
  
            if(!err) {
  
                pool.getConnection((err, connection) => {
                    if(err) throw err; //not connected!
                    console.log('Connected as ID' + connection.threadId);
                    //user the connection
            
                    connection.query('SELECT * FROM orders WHERE id = ?',[req.params.id], (err, rows) => {
                        //when done with the connection, release it
                        connection.release();
                        if(!err) {
                            res.render('edit-order-admin', { rows, alert: 'Данные о заказе успешно обновлены' });
                        } else {
                            console.log(err);
                        }
                        console.log('The data from orders table: \n', rows)
                    });
                });
  
            } else {
                console.log(err);
            }
            console.log('The data from orders table: \n', rows)
        });
    });
}

// delete order
exports.deleteOrder = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId);

        // use the connection
        connection.query('SELECT author_id FROM orders WHERE id = ?', [req.params.id], (err, rows) => {
            if(err || rows.length === 0) {
                console.log(err);
                let errorMessage = encodeURIComponent('Произошла ошибка при удалении заказа.');
                res.redirect('/dashboard/vieworder/' + req.params.id + '?error=' + errorMessage);
                return;
            }

            let author_id = rows[0].author_id;

            connection.query('DELETE FROM orders WHERE id = ? AND status = "Получен"', [req.params.id], (err, rows) => {
                // when done with the connection, release it
                connection.release();
                let removedMessage;
                if(!err) {
                    if(rows.affectedRows == 0) {
                        removedMessage = encodeURIComponent('Заказ не может быть удален, так как его статус не "Получен".');
                    } else {
                        removedMessage = encodeURIComponent('Заказ успешно удален.');
                    }
                } else {
                    console.log(err);
                    removedMessage = encodeURIComponent('Произошла ошибка при удалении заказа.');
                }
                res.redirect('/dashboard/vieworder/' + author_id + '?removed=' + removedMessage);
            });
        });
    });
};
