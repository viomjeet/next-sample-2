import path from "path";
import sqlite3 from "sqlite3";
const dbPath = path.join(process.cwd(), "database.db");
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    db.run('update todos set edited=1 where id=20',(err)=>{
        console.error(err ? err.message : "updatedDate added.")
    })
    console.log("sqlite3 Connected.");
});

db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    priority TEXT NOT NULL,
    status TEXT NOT NULL,
    createdDate TEXT NOT NULL,
    createdby TEXT NOT NULL,
    todosrc TEXT NOT NULL,
    updatedDate TEXT NOT NULL,
    edited INT 
)`, (err) => {
    console.error(err ? err.message : "Todos Table Createted")
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    fullname TEXT NOT NULL,
    useremail TEXT NOT NULL,
    username TEXT NOT NULL,
    status TEXT NOT NULL,
    userpassword TEXT NOT NULL
    )`, (err) => {
    console.error(err ? err.message : "users Table Createted")
});

db.run(`CREATE TABLE IF NOT EXISTS usersData (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username TEXT NOT NULL,
    imgsrc TEXT NOT NULL,
    friends TEXT NOT NULL
    )`, (err) => {
    console.error(err ? err.message : "usersData Table Createted")
});

// db.run('DROP TABLE IF EXISTS todos',(err)=>{
//     console.error(err ? err.message : "todos deleted.")
// })




export default db;