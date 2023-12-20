"use client";
import PageWrapper from "@/components/PageWrapper";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { projectsInterface } from "@/types";
import Message from "@/components/Message";
import { useRouter } from "next/navigation";

const UpdateProject = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<Omit<projectsInterface, "id">>({
        title: "",
        description: "",
        mainLink: "",
        time: "",
        chips: [],
        links: [],
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const getProject = async () => {
            try {
                const res = await fetch(`/api/projects/${params.id}`);
                const data = await res.json();
                setFormData(data);
            }
            catch (error) {
                console.log(error);
                setError(true);
            }
        }
        getProject();
    }, [params])


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(formData);
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            await fetch(`/api/projects/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            setSubmitted(true);
        }
        catch (error) {
            console.log(error);
            setError(true);
        }
    }

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            await fetch(`/api/projects/${params.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            router.push("/admin/projects");
        }
        catch (error) {
            console.log(error);
            setError(true);
        }
    }

    return (
        <PageWrapper className="p-10 md:p-24 h-screen w-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl text-gray-200 font-bold mb-10"> Update Project </h1>
            <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="title">
                            Project Title
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="mainLink">
                            Main Link
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="mainLink"
                            type="text"
                            value={formData.mainLink}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="time">
                            Time
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="time"
                            type="text"
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={10}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <button
                        className="shadow bg-green-900 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white hover:text-black font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={handleUpdate}
                    >
                        Update project
                    </button>
                    <button
                        className="shadow bg-red-900 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white hover:text-black font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={handleDelete}
                    >
                        Delete project
                    </button>
                </div>
            </form>
            {
                error && (
                    <Message text="something went wrong" color="orange" handler={setError} />
                )
            }
            {
                submitted && (
                    <Message text="project updated successfully" color="green" handler={setSubmitted} />
                )
            }
        </PageWrapper>
    );
}

export default UpdateProject;