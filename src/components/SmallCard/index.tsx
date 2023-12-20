import { motion } from "framer-motion"
import { cardAnimation } from "@/animations";
import Modal from "../Modal";
import { chipInterface, linksInterface } from "@/types";
import { useState } from "react";

const SmallCard = ({ id, title }: { id: number | string, title: string }) => {
    return (
        <motion.div
            variants={cardAnimation}
            className={"w-[50dvw] h-[50dvw] rounded-lg shadow-md relative drop-shadow-lg z-[-1000] bg-neutral-800 " + (id === Infinity ? "opacity-0" : "")}
        >
            <motion.div
                className="flex items-center justify-center h-full w-full h-full flex-col"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
            >
                <h1 className="text-6xl font-bold text-white"> {title} </h1>
                <small className="text-md text-neutral-500"> (click for more info) </small>
            </motion.div>
        </motion.div >
    )
}

export default SmallCard;