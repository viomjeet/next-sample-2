import db from '../../../../database'

import { NextRequest, NextResponse } from "next/server";
export async function GET(request: Request) {
    const reqUrl = await request.url
    const { searchParams } = new URL(reqUrl)
    let username = searchParams.get("createdby");
    try {
        const results = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM todos where createdby=?', [username], (err: Error, results: Response) => {
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
    const { title, body, priority, status, createdDate, createdby, todosrc, updatedDate, edited } = todo
    const query = `insert into todos(title, body, priority, status, createdDate, createdby, todosrc, updatedDate, edited) values(?,?,?,?,?,?,?,?,?)`;
    db.run(query, [title, body, priority, status, createdDate, createdby, todosrc, updatedDate, edited], (err: any) => {
        return NextResponse.json({ error: err?.message }, { status: 409 });
    })
    return NextResponse.json("Todo added successfully!", { status: 200 });
}

export async function PUT(request: Request, { params }: { params: { id: any } }) {
    const { id } = await params;
    const todo = await request.json();
    const { title, body, priority, status, createdDate, createdby, todosrc, updatedDate, edited } = todo
    const query = `update todos set title=?, body=?, priority=?, status=?, createdDate=?, createdby=?, todosrc=?, updatedDate=?, edited=? where id=?`;
    db.run(query, [title, body, priority, status, createdDate, createdby, todosrc, updatedDate, edited, id], (err: any) => {
        return NextResponse.json({ error: err?.message }, { status: 409 });
    })
    return NextResponse.json("Todo updated successfully!", { status: 200 });
}
