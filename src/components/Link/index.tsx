import { linksInterface } from "@/types";
import { motion } from "framer-motion";


const Link = ({ name, href }: linksInterface) => {
    return (
        <motion.div
            className="w-fit p-3 rounded flex items-center gap-4 justify-center bg-purple-800 text-neutral-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <a href={href} target="_blank"> {name} </a>
        </motion.div>
    )
}

export default Link;