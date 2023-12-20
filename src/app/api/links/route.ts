import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const GET = async () => {
    const links = await prisma.link.findMany({
        where: {
            User: {
                email: "diljith2003@gmail.com"
            }
        },
        select: {
            name: true,
            href: true,
            iconType: true,
            icon: true,
        }
    });

    return NextResponse.json(links);
}


const POST = async (req: Request) => {
    const data = await req.json();
    const { iconType, icon, name, href } = data;

    if (!iconType || !icon || !name || !href)
        return NextResponse.json({ error: "Please fill all the fields" }, { status: 400 })

    await prisma.link.create({
        data: {
            name,
            href,
            iconType,
            icon,
            User: {
                connect: {
                    email: "diljith2003@gmail.com",
                }
            }
        }
    });

    return NextResponse.json({ message: "link created successfully" });
}


export { GET, POST };