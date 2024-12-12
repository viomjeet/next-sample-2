import path from "path";
import sqlite3 from "sqlite3";
import { NextRequest, NextResponse } from "next/server";

const dbPath = path.join(process.cwd(), "database.db");
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to the database.");
});

db.run(`CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)`, (err) => {
    console.error(err ? err.message : "Todos Table Createted")
});

export async function GET(request: Request) {
    try {
        const results = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM todos', (err: Error, results: Response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const todo = await request.json();
    const { title } = todo
    const query = `insert into todos(title) values (?)`;
    db.run(query, [title], (err: any) => {
        return NextResponse.json({ error: err?.message });
    })
    return NextResponse.json({ success: "Data Inserted" });
}