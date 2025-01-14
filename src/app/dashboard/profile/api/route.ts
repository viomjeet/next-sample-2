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
}

export async function DELETE(request: Request) {
    const reqUrl = await request.url
    const { searchParams } = new URL(reqUrl)
    let username = searchParams.get("username");
    let file = searchParams.get("file");
    try {
        const filePath = `public/${file}`;
        const isFile: any = await fs.unlink(filePath)
        if (isFile?.status === 'fail') {
            return new NextResponse("File not found.");
        } else {
            const query = `update users set profilePic=null where username='${username}'`;
            db.run(query, (err: any) => {
                return new NextResponse(err?.message);
            })
            return NextResponse.json('Profle picture removed.');
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e });
    }
}