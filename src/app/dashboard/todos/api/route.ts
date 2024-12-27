import db from '../../../../database'

import { NextRequest, NextResponse } from "next/server";
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