import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import { projectsInterface } from "@/types";
const prisma = new PrismaClient();

const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const project = await prisma.project.findUniqueOrThrow({
            where: {
                id: params.id,
                User: {
                    email: "diljith2003@gmail.com",
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
            }
        })
        return NextResponse.json(project);
    }
    catch (error) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
}

const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await prisma.project.findUniqueOrThrow({
            where: {
                id: params.id,
                User: {
                    email: "diljith2003@gmail.com",
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
            }
        });
        const data: projectsInterface = await req.json();
        const { title, description, time, mainLink, chips, links } = data;
        if (!title || !description || !mainLink || !time || !chips || !links)
            return NextResponse.json({ error: "Please fill all the fields" }, { status: 400 })
        const updatedProject = await prisma.project.update({
            where: {
                id: params.id,
            },
            data: {
                title,
                description,
                time,
                mainLink,
                chips: {
                    deleteMany: {},
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
                    deleteMany: {},
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
        })

        return NextResponse.json(updatedProject);
    }
    catch {
        return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
}

const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await prisma.project.findUniqueOrThrow({
            where: {
                id: params.id,
            }
        });
        await prisma.icon.deleteMany({
            where: { projectId: params.id },
        });
        await prisma.link.deleteMany({
            where: { projectId: params.id },
        });
        await prisma.project.deleteMany({
            where: { id: params.id },


        });

        return NextResponse.json({ message: "Project deleted" });
    }
    catch {
        return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
}

export { GET, PUT, DELETE };