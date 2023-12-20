import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const GET = async () => {
    const techStack = await prisma.techStack.findMany({
        where: {
            User: {
                email: "diljith2003@gmail.com"
            }
        },
        select: {
            iconType: true,
            icon: true,
            tooltip: true
        }
    });

    return NextResponse.json(techStack);
}

const POST = async (req: Request) => {
    const data = await req.json();
    const { iconType, icon, tooltip } = data;

    if (!iconType || !icon || !tooltip)
        return NextResponse.json({ error: "Please fill all the fields" }, { status: 400 })

    await prisma.techStack.create({
        data: {
            iconType,
            icon,
            tooltip,
            User: {
                connect: {
                    email: "diljith2003@gmail.com",
                }
            }
        }
    });

    return NextResponse.json({ message: "TechStack created successfully" });
}


export { GET, POST };