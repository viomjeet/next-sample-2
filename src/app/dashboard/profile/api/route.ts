import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import db from '../../../../database'
export async function POST(req: Request) {
    try {
        const formData: any = await req.formData();
        const username: any = formData.get("formField");
        const results: any = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM users where username=?', username, (err: Error, results: Response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        if (results.length > 0) {
            const file = formData.get("file") as File;
            const arrayBuffer = await file.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            await fs.writeFile(`./public/uploads/${username}_${file.name}`, buffer);
            revalidatePath("/");
            const query = `update users set profilePic='${`/uploads/${username}_${file.name}`}' where username='${results[0].username}'`;
            console.log(query)
            db.run(query, (err: any) => {
                return NextResponse.json({ error: err?.message }, { status: 409 });
            });
            return NextResponse.json("Updated.");
        } else {
            return NextResponse.json("No user found", { status: 409 });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
    //   try {
    //     const formData = await req.formData();
    //     const file = formData.get("file") as File;
    //     const arrayBuffer = await file.arrayBuffer();
    //     const buffer = new Uint8Array(arrayBuffer);
    //     await fs.writeFile(`./public/uploads/${file.name}`, buffer);
    //     revalidatePath("/");
    //     return NextResponse.json({ status: "success" });
    //   } catch (e) {
    //     console.error(e);
    //     return NextResponse.json({ status: "fail", error: e });
    //   }
}

export async function GET(request: Request) {
    const users = await request.json();
    const { username } = users
    try {
        // const query = `update users set profilePic='' where username='${username}'`;
        // db.run(query, (err: any) => {
        //     return new NextResponse(err?.message);
        // })

        const results: any = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM users where username='${username}'`, (err: Error, results: Response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return NextResponse.json(results);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e });
    }
}