import db from '../../database'
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const reqUrl = await request.url;
    const { searchParams } = new URL(reqUrl);
    let type = searchParams.get("type");
    let username = searchParams.get("username");
    try {
        const results: any = await new Promise((resolve, reject) => {
            let query: any = type === "active" ? `status='active' and username='${username}'` : `status='inactive'`
            db.all(`SELECT id, fullname, useremail, username, status, profilePic FROM users where ${query}`, (err: Error, results: Response) => {
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
        return NextResponse.json("Logout successfully!", { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}