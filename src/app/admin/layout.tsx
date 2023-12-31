import { getServerSession } from "next-auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import AdminNavbar from "@/components/AdminNavbar";

export const metadata: Metadata = {
    title: 'Portfolio | Admin',
    description: 'Admin panel for the portfolio',
}
const layout = async ({ children }) => {
    const session = await getServerSession(options);
    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/admin");
    }
    return (
        <div className="w-screen h-screen relative">
            <div className="fixed bottom-10 md:top-10 h-fit z-[1000] w-screen flex justify-center ">
                <AdminNavbar />
            </div>
            {children}
        </div>
    )
}

export default layout;