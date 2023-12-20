import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const GET = async (req: Request) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: { email: "diljith2003@gmail.com" },
            select: {
                projects: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        time: true,
                        mainLink: true,
                        chips: {
                            select: {
                                iconType: true,
                                icon: true,
                                tooltip: true,
                            }
                        },
                        links: {
                            select: {
                                name: true,
                                href: true,
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    },
                },
                links: {
                    select: {
                        name: true,
                        href: true,
                        iconType: true,
                        icon: true,
                    }
                },
                techStack: {
                    select: {
                        iconType: true,
                        icon: true,
                        tooltip: true,
                    }
                }
            }
        })

        return NextResponse.json(user);
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

const POST = async (req: Request) => {
    try {
        const { password } = await req.json();
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, 16);

        await prisma.user.update({
            where: {
                email: "diljith2003@gmail.com"
            },
            data: {
                password: hashedPassword,
            }
        })
        return NextResponse.json({ message: "password successfully updated" });
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}


export { GET, POST };