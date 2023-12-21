"use client";
import PageWrapper from "@/components/PageWrapper";
import { techStackInterface } from "@/types";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Message from "@/components/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading";

const AddStack = () => {
    const [stack, setStack] = useState<techStackInterface[]>([])
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<techStackInterface>({
        iconType: "fas",
        icon: "plus",
        tooltip: "",
    });
    const [add, setAdd] = useState(false);
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getStack = async () => {
            try {
                const res = await fetch('/api/techstack');
                const data = await res.json();
                setStack(data);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getStack();
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(formData);
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            await fetch(`/api/techstack`, {
                method: 'POST',
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


    return (
        <PageWrapper className="p-10 md:p-24 h-screen w-screen flex flex-col items-center justify-center">
            {
                loading ? (
                    <div className="h-screen w-screen flex items-center justify-center backdrop-blur">
                        <Loading />
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl text-gray-200 font-bold mb-10"> Tech Stack </h1>
                        <div className="flex mt-8">
                            {
                                add ? (
                                    <PageWrapper className="p-10 md:p-24 h-screen w-screen flex flex-col items-center justify-center relative">
                                        <div className="flex gap-4 items-center justify-center mb-10">
                                            <h1 className="text-3xl text-gray-200 font-bold">
                                                Add new stack
                                            </h1>
                                            <button onClick={() => setAdd(false)} className="p-2 rounded w-fit text-center hover:text-red-800">
                                                <FontAwesomeIcon icon={faX} />
                                            </button>
                                        </div>
                                        <form className="w-full max-w-lg">
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="iconType">
                                                        Icon Type
                                                    </label>
                                                    <input
                                                        className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="iconType"
                                                        type="text"
                                                        value={formData.iconType}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="icon">
                                                        Icon
                                                    </label>
                                                    <input
                                                        className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="icon"
                                                        type="text"
                                                        value={formData.icon}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="tooltip">
                                                        Tooltip
                                                    </label>
                                                    <input
                                                        className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="tooltip"
                                                        type="text"
                                                        value={formData.tooltip}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center gap-4">
                                                <button
                                                    className="shadow bg-green-900 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white hover:text-black font-bold py-2 px-4 rounded"
                                                    type="button"
                                                    onClick={handleSubmit}
                                                >
                                                    Add Tech Stack
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
                                                <Message text="Stack item added successfully" color="green" handler={setSubmitted} />
                                            )
                                        }
                                    </PageWrapper>
                                ) : (
                                    <div>
                                        <div className="flex items-center justify-center gap-4 flex-wrap">
                                            {
                                                stack.map((stack, index) => (
                                                    <span key={index} className="p-2 rounded bg-neutral-700 w-fit text-center hover:bg-neutral-500 hover:text-neutral-800">
                                                        {stack.tooltip}
                                                    </span>
                                                ))
                                            }
                                        </div>
                                        <button onClick={() => setAdd(true)} className="mt-4 p-2 rounded w-full font-bold text-center">
                                            Add <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </>
                )
            }

        </PageWrapper>
    );
}

export default AddStack;