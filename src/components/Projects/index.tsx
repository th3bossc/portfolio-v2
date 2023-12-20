import PageWrapper from "@/components/PageWrapper";
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from "react";
import Card from "../Card";
import SmallCard from "../SmallCard";
import { projectsInterface } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";



const Projects = ({ data }: { data: projectsInterface[] }) => {
    const [current, setCurrent] = useState(1);
    const [detail, setDetail] = useState(false);
    const [size, setSize] = useState(0);

    useEffect(() => {
        setSize(window.innerWidth);
        window.onresize = window.onload = () => setSize(window.innerWidth);
    }, [])

    return (
        <PageWrapper className="w-screen h-screen flex justify-center items-center overflow-hidden">
            {
                data.slice(current - 1, current + 2).map((item, index) => (

                    <motion.div
                        // initial="exit"
                        key={current + index - 1}
                        className="relative"
                        onClick={() => setCurrent(prev => prev + index - 1)}
                        layoutId={`card-${item.id}`}
                        animate={index === 1 ? "center" : index === 2 ? "right" : "left"}
                        transition={{
                            type: "spring",
                            duration: 0.5,
                        }}
                    >
                        {
                            index === 1 && detail && (
                                <motion.button
                                    className="absolute top-4 right-4 z-[100] text-black text-3xl" onClick={() => setDetail(false)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </motion.button>
                            )
                        }
                        {size > 960 ? <Card index={index - 1} {...item} /> : (
                            <div
                                onClick={() => setDetail(true)}
                            >
                                {
                                    (detail && index === 1) ? (
                                        <Modal {...item} />
                                    ) : (
                                        <SmallCard {...item} />
                                    )
                                }

                            </div>
                        )}
                    </motion.div>
                ))
            }
            {
                (!detail || size > 960) && (
                    <>
                        <motion.button
                            className="absolute left-10 rounded-full bg-neutral-200 text-red-900 p-5 disabled:opacity-0"
                            onClick={() => setCurrent(prev => prev - 1)}
                            disabled={current === 1}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FontAwesomeIcon icon="arrow-left" />
                        </motion.button>

                        <motion.button
                            className="absolute right-10 rounded-full bg-neutral-200 text-red-900 p-5"
                            onClick={() => setCurrent(prev => prev + 1)}
                            disabled={current === data.length - 2}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FontAwesomeIcon icon="arrow-right" />
                        </motion.button>
                    </>
                )
            }

        </PageWrapper >
    )
}


export default Projects;