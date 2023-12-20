import { linksInterface } from "@/types";
import Link from "next/link";
const navItems: linksInterface[] = [
    { name: "Dashboard", href: "/admin" },
    { name: "Projects", href: "/admin/projects" },
    { name: "TechStack", href: "/admin/techstack" },
    { name: "Links", href: "/admin/links" },
    { name: "Sign Out", href: "/api/auth/signout?callbackUrl=/" }
]

const AdminNavbar = () => {
    return (
        <nav className="backdrop-blur flex justify-center items-center gap-10 sticky w-fit h-16 z-10 ps-4 pe-4">
            <div className="flex justify-center items-center gap-2">
                {
                    navItems.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                scroll={true}
                                className={"px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in text-white hover:text-red-300"}
                            >
                                {item.name}
                            </Link>
                        )
                    })
                }
            </div>
        </nav>
    )
}

export default AdminNavbar;