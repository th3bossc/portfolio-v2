"use client";
import { motion } from "framer-motion";

const PageWrapper = ({
    children,
    className
}: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <motion.div
            className={"min-h-screenHeightWithoutReader pt-5 " + (className ? className : "")}
        >
            {children}
        </motion.div>
    )
}

export default PageWrapper;