"use client";
import PageWrapper from "@/components/PageWrapper";
import { ChangeEvent, FormEvent, useState } from "react";
import Message from "@/components/Message";

const UpdateProfile = () => {
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(formData);
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        if (formData.password !== formData.confirmPassword) {
            setError(true);
            return;
        }
        try {
            const res = await fetch("/api/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: formData.password }),
            })
            setUpdated(true);
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <PageWrapper className="p-10 md:p-24 h-screen w-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl text-gray-200 font-bold mb-10"> Profile </h1>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button className="w-full shadow bg-red-900 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white hover:text-black font-bold py-2 px-4 rounded" type="submit">
                    Update password
                </button>
            </form>

            {
                error && (
                    <Message text="passwords do not match" color="orange" handler={setError} />
                )
            }

            {
                updated && (
                    <Message text="password updated successfully" color="green" handler={setUpdated} />
                )
            }
        </PageWrapper>
    )
}

export default UpdateProfile;