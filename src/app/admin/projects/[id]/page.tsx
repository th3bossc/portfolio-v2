"use client";
import PageWrapper from "@/components/PageWrapper";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { projectsInterface } from "@/types";
import Message from "@/components/Message";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const UpdateProject = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
            try {
                const res = await fetch(`/api/projects/${params.id}`);
                const data = await res.json();
                setFormData(data);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
                setLoading(false);
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
        e.preventDefault();
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
        e.preventDefault();
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

    const addChip = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFormData({
            ...formData,
            chips: [...formData.chips, {
                icon: "coffee",
                iconType: "fas",
                tooltip: "",
            }]
        });
    }

    const addLink = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFormData({
            ...formData,
            links: [...formData.links, {
                name: "",
                href: "",
            }]
        });
    }

    const updateChip = (e: ChangeEvent<HTMLInputElement>, index: number, type: string) => {
        const chips = formData.chips;
        chips[index][type] = e.target.value;
        setFormData({
            ...formData,
            chips: chips,
        });
    }

    const updateLink = (e: ChangeEvent<HTMLInputElement>, index: number, type: string) => {
        const links = formData.links;
        links[index][type] = e.target.value;
        setFormData({
            ...formData,
            links: links,
        });
    }

    return (
        <PageWrapper className="p-10 md:p-24 mt-5 w-screen flex flex-col items-center justify-center">
            {
                loading ? (
                    <div className="h-screen w-screen flex items-center justify-center backdrop-blur">
                        <Loading />
                    </div>
                ) : (
                    <>
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


                            <div className="mb-10 flex justify-center gap-8 items-center">
                                <h2 className="text-xl text-gray-200 font-bold text-center"> Chips </h2>
                                <button onClick={addChip} className="p-2 rounded w-fit font-bold text-center">
                                    Add <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            {
                                formData.chips.map((_, index) => (
                                    <div key={index} className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor={`iconType-${index}`}>
                                                Icon type
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id={`iconType-${index}`}
                                                type="text"
                                                value={formData.chips[index].iconType}
                                                onChange={(e) => updateChip(e, index, "iconType")}
                                            />
                                        </div>
                                        <div className="w-full md:w-1/3 px-3">
                                            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor={`icon-${index}`}>
                                                Icon
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id={`icon-${index}`}
                                                type="text"
                                                value={formData.chips[index].icon}
                                                onChange={(e) => updateChip(e, index, "icon")}
                                            />
                                        </div>
                                        <div className="w-full md:w-1/3 px-3">
                                            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor={`tooltip-${index}`}>
                                                Tooltip
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id={`tooltip-${index}`}
                                                type="text"
                                                value={formData.chips[index].tooltip}
                                                onChange={(e) => updateChip(e, index, "tooltip")}
                                            />
                                        </div>
                                    </div>

                                ))
                            }


                            <div className="mb-10 flex justify-center gap-8 items-center">
                                <h2 className="text-xl text-gray-200 font-bold text-center"> Links </h2>
                                <button onClick={addLink} className="p-2 rounded font-bold text-center">
                                    Add <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            {
                                formData.links.map((_, index) => (
                                    <div key={index} className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor={`name-${index}`}>
                                                Link name
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id={`name-${index}`}
                                                type="text"
                                                value={formData.links[index].name}
                                                onChange={(e) => updateLink(e, index, "name")}
                                            />
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor={`href-${index}`}>
                                                Link address
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id={`href-${index}`}
                                                type="text"
                                                value={formData.links[index].href}
                                                onChange={(e) => updateLink(e, index, "href")}
                                            />
                                        </div>
                                    </div>
                                ))
                            }


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
                    </>
                )
            }
        </PageWrapper >
    );
}

export default UpdateProject;