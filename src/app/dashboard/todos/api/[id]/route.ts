import db from '../../../../../database'
import { NextRequest, NextResponse } from "next/server";
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