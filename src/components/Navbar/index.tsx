import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { linksInterface } from "@/types";

const navItems: linksInterface[] = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];


const Navbar = ({ current }: { current: string }) => {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <nav className="backdrop-blur text-white flex justify-center items-center gap-10 sticky w-fit h-16 z-10 ps-4 pe-4">
            <div className="flex justify-center items-center gap-2">
                {
                    navItems.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                scroll={true}
                                className={"px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in"}
                                onMouseOver={() => setHovered(item.href)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {
                                    item.href === current && (
                                        <motion.span
                                            layoutId="current"
                                            className="absolute left-0 top-0 block h-full w-full bg-neutral-700 rounded -z-10"
                                        />
                                    )
                                }
                                {

                                    item.href === hovered && item.href !== current && (
                                        <motion.span
                                            layoutId="hovered"
                                            className="absolute left-0 top-0 block h-full w-full bg-neutral-600 rounded -z-10"
                                        />
                                    )
                                }
                                {item.name}
                            </Link>
                        )
                    })
                }
            </div>
        </nav>
    )
}

export default Navbar;