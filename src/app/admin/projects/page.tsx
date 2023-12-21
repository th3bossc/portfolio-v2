"use client";
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddProject = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getProjects = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/projects");
                const data = await res.json();
                setProjects(data);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getProjects();
    }, []);

    return (
        <PageWrapper className="p-10 md:p-24 h-screen w-screen flex flex-col items-center justify-center">
            {
                loading ? (
                    <div className="h-screen w-screen flex items-center justify-center backdrop-blur">
                        <Loading />
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl text-gray-200 font-bold mb-10"> Projects </h1>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            {
                                projects.map((project, index) => (
                                    <Link key={index} href={`/admin/projects/${project.id}`} className="p-2 rounded bg-neutral-700 w-fit text-center hover:bg-neutral-500 hover:text-neutral-800">
                                        {project.title}
                                    </Link>
                                ))
                            }
                        </div>
                        {/* <button onClick={cdd} className="mt-4 p-2 rounded w-full font-bold text-center">
                                Add <FontAwesomeIcon icon={faPlus} />
                            </button> */}
                        <Link href="/admin/projects/new" className="mt-4 p-2 rounded w-fit font-bold text-center">
                            Add <FontAwesomeIcon icon={faPlus} />
                        </Link>
                    </>
                )
            }
        </PageWrapper>
    );
}

export default AddProject;