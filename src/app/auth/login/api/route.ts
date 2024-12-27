import db from '../../../../database'
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    const todo = await request.json();
    const { useremail, userpassword } = todo
    try {
        const results: any = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM users where useremail=? and userpassword=?', useremail, userpassword, (err: Error, results: Response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        if (results.length > 0) {
            const query = `update users set status=? where useremail=?`;
            db.run(query, ['active', useremail], (err: any) => {
                return NextResponse.json({ error: err?.message }, { status: 409 });
            })
            return NextResponse.json(results[0]?.username, { status: 200 });
        } else {
            return NextResponse.json("Invalid Credentials", { status: 409 });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}