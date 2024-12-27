import db from '../../../../database'
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    const user = await request.json();
    const { fullname, useremail, username, status, userpassword } = user
    try {
        const results: any = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM users where useremail=? or username=?', useremail, username, (err: Error, results: Response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        if (results.length > 0) {
            if (results.some((o: any) => o.useremail === useremail)) {
                return NextResponse.json("Email already exists.", { status: 409 });
            } else if (results.some((o: any) => o.username === username)) {
                return NextResponse.json("User Id already exists.", { status: 409 });
            }
        } else {
            const query = `insert into users(fullname,useremail,username,status,userpassword) values (?,?,?,?,?)`;
            db.run(query, [fullname, useremail, username, status, userpassword], (err: any) => {
                return NextResponse.json({ error: err?.message }, { status: 409 });
            })
            return NextResponse.json("Register successfully!", { status: 201 });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}