const sqlite3 = require('sqlite3').verbose();
let sql;
const db = new sqlite3.Database('./src/app/api/base.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});


// // CREATE
// sql ='CREATE TABLE users(id INTEGER PRIMARY KEY, first_name,last_name,email,password)';
// db.run(sql);
//DROP
// db.run('DROP TABLE users');
//ISERT
// sql = 'INSERT INTO users(first_name, last_name, email, password) VALUES (?, ?, ?, ?)'
// db.run(sql,['Egor','Glebov', 'e.glebov@innopolois.university','123'], (err) => {
//     if (err) return console.error(err.message);
// })
// sql ='CREATE TABLE items(id INTEGER PRIMARY KEY, name,description,img,price)';
// db.run(sql);

function runQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

function getQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

export async function addUser(first_name, last_name, email, password) {
    sql = 'INSERT INTO users(first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    try {
        await runQuery(sql, [first_name, last_name, email, password]);
    } catch (err) {
        console.error(err.message);
    }
}

export async function getUser(email) {
    sql = 'SELECT * FROM users WHERE email = ?';
    try {
        const rows = await getQuery(sql, [email]);
        return rows[0];
    } catch (err) {
        console.error(err.message);
    }
}

export async function getMenu() {
    sql = 'SELECT * FROM items';
    try {
        const rows = await getQuery(sql);
        console.log(rows);
        return rows;
    } catch (err) {
        console.error(err.message);
    }
}

export async function addItem(name, description, img, price) {
    if (await getItem(name) != null){
        return false;
    }
    sql = 'INSERT INTO items(name, description, img, price) VALUES (?, ?, ?, ?)';
    try {
        await runQuery(sql, [name, description, img, price]);
        return true;
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

export async function getItem(name) {
    sql = 'SELECT * FROM items WHERE name = ?';
    try {
        const rows = await getQuery(sql, [name]);
        return rows[0];
    } catch (err) {
        console.error(err.message);
    }
}

export async function deleteItem(name) {
    sql = 'DELETE FROM items WHERE name = ?';
    try {
        await runQuery(sql, [name]);
    } catch (err) {
        console.error(err.message);
    }
}