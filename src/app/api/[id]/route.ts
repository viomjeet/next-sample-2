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

export async function DELETE(request: Request, { params }: { params: { id: any } }) {
    const id = params.id;
    const query = `delete from todos where id=?`;
    db.run(query, id, (err: any) => {
        return new NextResponse(err?.message);
    })
    return new NextResponse("Deleted");
}
export async function PUT(request: Request, { params }: { params: { id: any } }) {
    const id = params.id;
    const todo = await request.json();
    const { title } = todo
    const query = `update todos set title=? where id=?`;
    db.run(query, [title, id], (err: any) => {
        if (err) {
            return new NextResponse(err?.message);
        }
    })
    return new NextResponse(JSON.stringify({ "id": id, "title": title }));
}