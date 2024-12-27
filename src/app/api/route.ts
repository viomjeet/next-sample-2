import db from '../../database'
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const reqUrl = await request.url
    const { searchParams } = new URL(reqUrl)
    let username = searchParams.get("username");
    try {
        const results: any = await new Promise((resolve, reject) => {
            db.all('SELECT fullname, useremail, username, status FROM users where status=? and username=?', 'active', username, (err: Error, results: Response) => {
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
    const user = await request.json();
    const { username } = user
    try {
        const query = `update users set status=? where username=?`;
        db.run(query, ['inactive', username], (err: any) => {
            return NextResponse.json({ error: err?.message }, { status: 409 });
        })
        return NextResponse.json("Logout successfully!", { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}