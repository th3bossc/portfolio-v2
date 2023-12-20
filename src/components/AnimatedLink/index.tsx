import { motion } from "framer-motion";
import { textAnimation } from "@/animations";


const AnimatedLink = ({
    title,
    href,
    top,
    hovered
}: {
    title: string,
    href: string,
    top: boolean,
    hovered: boolean
}) => {
    return (
        <a href={href} target="_blank">
            <motion.span
                initial="rest"
                animate={hovered ? "hover" : "rest"}
                transition={{
                    staggerChildren: 0.01,
                }}
            >
                {
                    title.split("").map((char, index) => {
                        return (char === " ") ? (
                            <span key={index}>&nbsp;</span>
                        ) : (
                            <motion.span
                                key={index}
                                className="relative underline inline-block whitespace-nowrap text-3xl font-bold"
                                variants={top ? textAnimation.topTextAnimation : textAnimation.bottomTextAnimation}
                            >
                                {char}
                            </motion.span>
                        )
                    })
                }
            </motion.span>
        </a>
    )
}

export default AnimatedLink;