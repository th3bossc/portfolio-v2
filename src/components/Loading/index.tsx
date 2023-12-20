import { motion } from "framer-motion";
import { loadingAnimation } from "@/animations";

const Loading = () => {
    return (
        <div>
            <div className="pt-5 pb-5 w-[400px] max-w-[80dvw] relative bg-white">
                <motion.div
                    className="bg-neutral-900 absolute top-0 left-0 h-full"
                    variants={loadingAnimation}
                    animate="animateLeft"
                    transition={{
                        duration: 1.5,
                        type: "tween",
                        repeat: Infinity,
                    }}
                >
                </motion.div>
                <motion.div
                    className="bg-neutral-900 absolute top-0 right-0 h-full"
                    variants={loadingAnimation}
                    animate="animateRight"
                    transition={{
                        duration: 1.5,
                        type: "tween",
                        repeat: Infinity,
                    }}
                >
                </motion.div>


                <motion.div
                    className="z-100 font-bold text-4xl text-neutral-900 text-center absolute top-0 left-0 h-full w-full flex justify-center items-center rounded"
                    animate="dots"
                    transition={{
                        duration: 0.2,
                        ease: 'easeInOut',
                        staggerChildren: 0.2,
                    }}
                >
                    <h1> Loading </h1>
                    {
                        ['.', '.', '.'].map((dot, index) => (
                            <motion.h1
                                key={index}
                                variants={loadingAnimation}
                                transition={{
                                    repeat: Infinity,
                                }}
                            >
                                {dot}
                            </motion.h1>
                        ))
                    }

                </motion.div>
            </div >
        </div>
    );
}

export default Loading;