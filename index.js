const express = require('express')
const app = express()
const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost:3306',
    password: '',
    database: 'employeedatabase',
});

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO employees (employee_name) VALUES ('John Smith');"
    db.query(sqlInsert, (err, result) => {
        res.send("Hello World");
    });
});

app.get("/", (req, res) => {
    res.send("Hello world test");
});

app.listen(3001, () => {
    console.log('running on port 3001');
});