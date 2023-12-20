"use client";
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AddProject = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const res = await fetch("/api/projects");
                const data = await res.json();
                setProjects(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getProjects();
    }, []);

    return (
        <PageWrapper className="p-10 md:p-24 h-screen w-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl text-gray-200 font-bold mb-10"> Projects </h1>
            <div className="flex flex-col items-center justify-center gap-4">
                {
                    projects.map((project, index) => (
                        <Link key={index} href={`/admin/projects/${project.id}`} className="p-2 rounded bg-neutral-700 w-full text-center hover:bg-neutral-500 hover:text-neutral-800">
                            {project.title}
                        </Link>
                    ))
                }
            </div>
        </PageWrapper>
    );
}

export default AddProject;