import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import { projectsInterface } from "@/types";
const prisma = new PrismaClient();

const GET = async () => {
    const projects = await prisma.project.findMany({
        where: {
            User: {
                email: "diljith2003@gmail.com"
            }
        },
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
        }
    })
    return NextResponse.json(projects)
}

const POST = async (req: Request) => {
    const data: projectsInterface = await req.json()
    const { title, description, time, mainLink, chips, links } = data;
    if (!title || !description || !mainLink || !time || !chips || !links)
        return NextResponse.json({ error: "Please fill all the fields" }, { status: 400 })

    const project = await prisma.project.create({
        data: {
            title,
            description,
            time,
            mainLink,
            User: {
                connect: {
                    email: "diljith2003@gmail.com"
                }
            },
            chips: {
                createMany: {
                    data: chips.map(chip => {
                        return {
                            iconType: chip.iconType,
                            icon: chip.icon,
                            tooltip: chip.tooltip,
                        }
                    })

                }
            },
            links: {
                createMany: {
                    data: links.map(link => {
                        return {
                            name: link.name,
                            href: link.href,
                        }
                    })
                }
            },
        },
        include: {
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
        }
    })

    return NextResponse.json(project);
}
export { GET, POST };