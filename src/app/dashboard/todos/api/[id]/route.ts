import db from '../../../../../database'
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { id: any } }) {
    const { id } = await params;
    try {
        const results = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM todos where id=?', [id], (err: Error, results: Response) => {
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

export async function DELETE(request: Request, { params }: { params: { id: any } }) {
    const id = params.id;
    const query = `delete from todos where id=?`;
    db.run(query, id, (err: any) => {
        return new NextResponse(err?.message);
    })
    return new NextResponse("Deleted");
}

export async function PUT(request: Request, { params }: { params: { id: any } }) {
    const { id } = await params;
    const todo = await request.json();
    // return NextResponse.json(todo, { status: 200 });
    const { title, body, priority, status, createdDate, createdby, todosrc, updatedDate, edited } = todo
    const query = `update todos set title=?, body=?, priority=?, status=?, createdDate=?, createdby=?, todosrc=?, updatedDate=?, edited=? where id=?`;
    db.run(query, [title, body, priority, status, createdDate, createdby, todosrc, updatedDate, edited, id], (err: any) => {
        return NextResponse.json({ error: err?.message }, { status: 409 });
    })
    return NextResponse.json("Todo updated successfully!", { status: 200 });
}

export async function POST(request: Request, { params }: { params: { id: any } }) {
    const id = params.id;
    try {
        const results = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM todos where id=?', id, (err: Error, results: Response) => {
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