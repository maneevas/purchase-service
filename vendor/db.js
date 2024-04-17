import dotenv from 'dotenv';
dotenv.config();
import { pool } from '../index.js';


//register
export const register = async (req, res) => {
    const { surname, name, patname, location, email, password } = req.body;

    try {
        const query = 'INSERT INTO users SET surname = ?, name = ?, patname = ?, location = ?, email = ?, password = ?';
        console.log('Выполняется SQL-запрос: ', query);
        const result = await pool.execute(query, [surname, name, patname, location, email, password]);
        if (result) {
            const [rows, fields] = result;
            res.render('login', { alert: 'Пользователь успешно создан! Теперь вы можете войти.' });
            console.log('The data from users table: \n', rows);
        } else {
            console.log('Ошибка: результат запроса к базе данных не определен');
        }
    } catch (err) {
        console.log(err);
    }
};

//login
export const login = async (req, res) => {
    const { email, password } = req.body;

    // check for null or undefined
    if (!email || !password) {
        console.log('Ошибка: email или password не определены');
        return;
    }

    try {
        const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
        console.log('Выполняется SQL-запрос: ', query);
        console.log(`Email: ${email}, Password: ${password}`); // see params

        const connection = await pool.getConnection();
        console.log('Подключено как ID ' + connection.threadId);

        const [rows, fields] = await connection.execute(query, [email, password]);
        if (rows.length > 0) {
            req.session.isAuthenticated = true;
            req.session.user = rows[0];
            console.log(req.session.user);

            if (Number(req.session.user.is_admin) == 0) {
                res.redirect('/myorders');
            } else {
                res.redirect('/dashboard');
            }
            
        } else {
            res.render('login', { alert: 'Неверный email или пароль.' });
        }
        
        connection.release();
    } catch (err) {
        console.error(err);
    }
};


// ADMINS PART
//show users
export const view = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'SELECT users.*, COUNT(orders.id) as order_count FROM users LEFT JOIN orders ON users.id = orders.author_id WHERE users.is_admin = 0 GROUP BY users.id';
        const [rows, fields] = await connection.query(query);
        connection.release();
        let removedUser = req.query.removed;
        res.render('dashboard', {title: 'База данных', rows, removedUser, isAuthenticated: req.session.isAuthenticated, user: req.session.user });
        console.log('The data from users table: \n', rows);
    } catch (err) {
        console.log(err);
    }
};

    

//find user by search
export const find = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        let searchTerm = req.body.search;
        const query = 'SELECT * from users WHERE surname LIKE ? OR location LIKE ?';
        const [rows, fields] = await connection.query(query, ['%' + searchTerm + '%', '%' + searchTerm + '%']);
        connection.release();
        res.render('dashboard', {title: 'База данных', rows, isAuthenticated: req.session.isAuthenticated, user: req.session.user });
        console.log('The data from users table: \n', rows);
    } catch (err) {
        console.log(err);
    }
};

export const form = (req, res) => {
    res.render('add-user', {title: 'Создание пользователя', isAuthenticated: req.session.isAuthenticated, user: req.session.user});
};


    //add new user
    export const create = async (req, res) => {
        const { surname, name, patname, location, email, password} = req.body;
        try {
            const connection = await pool.getConnection();
            console.log('Connected as ID' + connection.threadId);
            const query = 'INSERT  INTO users SET surname = ?, name = ?, patname = ?, location = ?, email = ?, password = ?';
            const [rows, fields] = await connection.query(query, [surname, name, patname, location, email, password]);
            connection.release();
            res.render('add-user', {title: 'Создание пользователя', alert: 'Пользователь успешно создан!', isAuthenticated: req.session.isAuthenticated, user: req.session.user });
            console.log('The data from users table: \n', rows);
        } catch (err) {
            console.log(err);
        }
    };


 //edit user
 export const edit = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'SELECT * FROM users WHERE id = ?';
        const [rows, fields] = await connection.query(query, [req.params.id]);
        connection.release();
        res.render('edit-user', {title: 'Редактирование пользователя', rows, isAuthenticated: req.session.isAuthenticated, user: req.session.user });
        console.log('The data from users table: \n', rows);
    } catch (err) {
        console.log(err);
    }
};

 //update user
export const update = async (req, res) => {
    const { surname, name, patname, location, email, password} = req.body;
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'UPDATE users SET surname = ?, name = ?, patname =?, location = ?, email = ?, password = ? WHERE id = ?';
        const [rows, fields] = await connection.query(query, [surname, name, patname, location, email, password, req.params.id]);
        connection.release();
        
        const connection2 = await pool.getConnection();
        console.log('Connected as ID' + connection2.threadId);
        const query2 = 'SELECT * FROM users WHERE id = ?';
        const [rows2, fields2] = await connection2.query(query2, [req.params.id]);
        connection2.release();
        res.render('edit-user', {title: 'Редактирование пользователя', rows: rows2, alert: 'Данные о пользователе успешно обновлены', isAuthenticated: req.session.isAuthenticated, user: req.session.user });
        console.log('The data from users table: \n', rows2);
        
        console.log('The data from users table: \n', rows);
    } catch (err) {
        console.log(err);
    }
};

  
//delete user
export const deleteUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'DELETE FROM users WHERE id = ?';
        const [rows, fields] = await connection.query(query, [req.params.id]);
        connection.release();
        
        let removedMessage = encodeURIComponent('Пользователь успешно удален.')
        res.redirect('/dashboard?removed=' + removedMessage);
        
        console.log('The data from users table: \n', rows);
    } catch (err) {
        console.log(err);
    }
};


 //view specific orders
 export const vieworder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'SELECT * FROM users WHERE id = ?';
        const [userRows, userFields] = await connection.query(query, [req.params.id]);
        console.log('The data from users table: \n', userRows);
        const query2 = 'SELECT * FROM orders WHERE author_id = ?';
        const [orderRows, orderFields] = await connection.query(query2, [req.params.id]);
        connection.release();
        res.render('view-order', {title: 'Заказы пользователя', viewedUser: userRows[0], orders: orderRows, isAuthenticated: req.session.isAuthenticated, user: req.session.user });

        console.log('The data from orders table: \n', orderRows);
    } catch (err) {
        console.log(err);
    }
};

//edit order admin
export const editOrderAdmin = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'SELECT * FROM orders WHERE id = ?';
        const [rows, fields] = await connection.query(query, [req.params.id]);
        connection.release();
        res.render('edit-order-admin', {title: 'Изменение заказа', rows, isAuthenticated: req.session.isAuthenticated, user: req.session.user });
        console.log('The data from orders table: \n', rows);
    } catch (err) {
        console.log(err);
    }
};

//update order admin
export const updateOrderAdmin = async (req, res) => {
    const { quantity, link, status } = req.body;
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'UPDATE orders SET quantity = ?, link =?, status = ? WHERE id = ?';
        const [rows, fields] = await connection.query(query, [quantity, link, status, req.params.id]);

        const query2 = 'SELECT * FROM orders WHERE id = ?';
        const [orderRows, orderFields] = await connection.query(query2, [req.params.id]);

        const query3 = 'SELECT * FROM users WHERE id = ?';
        const [userRows, userFields] = await connection.query(query3, [orderRows[0].author_id]);
        
        connection.release();

        res.render('view-order', {title: 'Заказы пользователя', viewedUser: userRows[0], orders: orderRows, isAuthenticated: req.session.isAuthenticated, user: req.session.user });

        console.log('The data from orders table: \n', orderRows);
        
        console.log('The data from users table: \n', userRows);
    } catch (err) {
        console.log(err);
    }
};



// delete order
export const deleteOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'SELECT author_id FROM orders WHERE id = ?';
        const [rows, fields] = await connection.query(query, [req.params.id]);
        if(rows.length === 0) {
            let errorMessage = encodeURIComponent('Произошла ошибка при удалении заказа.');
            res.redirect('/dashboard/vieworder/' + req.params.id + '?error=' + errorMessage);
            return;
        }
        let author_id = rows[0].author_id;
        const query2 = 'DELETE FROM orders WHERE id = ? AND status = "Получен"';
        const [rows2, fields2] = await connection.query(query2, [req.params.id]);
        connection.release();
        let removedMessage;
        if(rows2.affectedRows == 0) {
            removedMessage = encodeURIComponent('Заказ не может быть удален, так как его статус не "Получен".');
        } else {
            removedMessage = encodeURIComponent('Заказ успешно удален.');
        }
        res.redirect('/dashboard/vieworder/' + author_id + '?removed=' + removedMessage);
    } catch (err) {
        console.log(err);
        let errorMessage = encodeURIComponent('Произошла ошибка при удалении заказа.');
        res.redirect('/dashboard/vieworder/' + req.params.id + '?error=' + errorMessage);
    }
};

//show orders on manage-orders page
export const viewall = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'SELECT orders.*, users.email FROM orders JOIN users ON orders.author_id = users.id';
        const [orderRows, orderFields] = await connection.query(query);
        connection.release();
        res.render('manage-orders', {title: 'Управление заказами', orders: orderRows, isAuthenticated: req.session.isAuthenticated, user: req.session.user });
        console.log('The data from orders table: \n', orderRows);
    } catch (err) {
        console.log(err);
    }
};


// USERS PART

    //view orders
    export const myorders = async (req, res) => {
        try {
            const connection = await pool.getConnection();
            console.log('Connected as ID' + connection.threadId);
            const query = 'SELECT * FROM orders WHERE author_id = ?';
            const [rows, fields] = await connection.query(query, [req.session.user.id]);
            connection.release();
            res.render('myorders', {title: 'Мои заказы', rows, isAuthenticated: req.session.isAuthenticated });
            console.log('The data from orders table: \n', rows);
        } catch (err) {
            console.log(err);
        }
    };

//find order by search
export const findOrders = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        let searchTerm = req.body.search;
        const query = 'SELECT * FROM orders WHERE author_id = ? AND good LIKE ?';
        const [rows, fields] = await connection.query(query, [req.session.user.id, '%' + searchTerm + '%']);
        connection.release();
        res.render('myorders', {title: 'Мои заказы', rows });
        console.log('The data from orders table: \n', rows);
    } catch (err) {
        console.log(err);
    }
};

export const formOrder = (req, res) => {
    res.render('add-order', {title: 'Новый заказ',});
};

//add new order
export const createOrder = async (req, res) => {
    const { good, quantity, link, arrival_date } = req.body;
    const author_id = req.session.user.id;
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'INSERT INTO orders SET good = ?, quantity = ?, link = ?, creation_date = NOW(), arrival_date = ?, author_id = ?';
        const [rows, fields] = await connection.query(query, [good, quantity, link, arrival_date, author_id]);
        connection.release();
        res.render('add-order', {title: 'Новый заказ', alert: 'Заказ успешно создан!' });
        console.log('The data from orders table: \n', rows);
    } catch (err) {
        console.log(err);
    }
};

//edit order
export const editOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'SELECT * FROM orders WHERE id = ?';
        const [rows, fields] = await connection.query(query, [req.params.id]);
        connection.release();
        res.render('edit-order', {title: 'Изменение заказа', rows });
        console.log('The data from orders table: \n', rows);
    } catch (err) {
        console.log(err);
    }
};

//update order
export const updateOrder = async (req, res) => {
    const { good, quantity, link, arrival_date } = req.body;
    try {
        const connection = await pool.getConnection();
        console.log('Connected as ID' + connection.threadId);
        const query = 'UPDATE orders SET good = ?, quantity = ?, link =?, arrival_date = ? WHERE id = ?';
        const [rows, fields] = await connection.query(query, [good, quantity, link, arrival_date, req.params.id]);
        connection.release();
        
        const connection2 = await pool.getConnection();
        console.log('Connected as ID' + connection2.threadId);
        const query2 = 'SELECT * FROM orders WHERE id = ?';
        const [rows2, fields2] = await connection2.query(query2, [req.params.id]);
        connection2.release();
        res.render('edit-order', {title: 'Изменение заказа', rows: rows2, alert: 'Данные о заказе успешно обновлены' });
        console.log('The data from orders table: \n', rows2);
        
        console.log('The data from orders table: \n', rows);
    } catch (err) {
        console.log(err);
    }
};
