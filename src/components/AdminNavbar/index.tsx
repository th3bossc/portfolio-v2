"use client";

import { linksInterface } from "@/types";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems: linksInterface[] = [
    { name: "Dashboard", href: "/admin" },
    { name: "Projects", href: "/admin/projects" },
    { name: "TechStack", href: "/admin/techstack" },
    { name: "Links", href: "/admin/links" },
    { name: "Sign Out", href: "/api/auth/signout?callbackUrl=/" }
]

const AdminNavbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <nav className="backdrop-blur flex justify-center items-center gap-10 sticky w-fit h-16 z-10 ps-4 pe-4">
            <div className="flex justify-center items-center gap-2">
                <motion.button
                    onClick={() => router.back()}
                    whileHover={{ scale: 1.05, gap: "1rem" }}
                    whileTap={{ scale: 0.95, gap: "0.8rem" }}
                    className={"px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2 lg:text-base relative no-underline duration-300 ease-in text-white hover:text-red-300"}
                    transition={{ ease: "easeInOut", duration: 0.2 }}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="sm" />
                    <span>Back</span>
                </motion.button>
                {
                    navItems.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                scroll={true}
                                className={"px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in text-white hover:text-red-300"}
                            >
                                {
                                    item.href === pathname && (
                                        <motion.span
                                            layoutId="current"
                                            className="absolute left-0 top-0 block h-full w-full bg-neutral-700 rounded -z-10"
                                        />
                                    )
                                }
                                {item.name}
                            </Link>
                        )
                    })
                }
            </div>
        </nav >
    )
}

export default AdminNavbar;