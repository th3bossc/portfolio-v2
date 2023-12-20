import "./styles.scss"
import { motion } from "framer-motion";
import { cardAnimation } from "@/animations";
import { useRef, useState } from "react";
import useMousePosition from "@/hooks/useMousePosition";
import { chipInterface, linksInterface } from "@/types";
import ProjectTitle from "../ProjectTitle";
import Chip from "../Chip";
import Link from "../Link";
import Image from "next/image";
import bg from "/public/admin-bg.svg";

const Card = ({
    index,
    id,
    title,
    description,
    time,
    mainLink,
    chips,
    links,
}: {
    index: number,
    id: number | string,
    title: string,
    description: string,
    time: string,
    mainLink: string,
    chips: chipInterface[],
    links: linksInterface[],
}) => {

    const [isHovered, setIsHovered] = useState(false);
    const size = isHovered ? 1500 : 40;
    const container = useRef<HTMLDivElement>(null);
    const { x, y } = useMousePosition({ ref: container });

    return (
        <motion.div
            variants={cardAnimation}
            className={"front w-[800px] h-[500px] rounded-lg shadow-md relative drop-shadow-lg z-[-1000] overflow-hidden" + (id === Infinity ? " opacity-0" : "")}
            ref={container}
        >
            <motion.div
                hidden={index !== 0}
                className="mask back w-full h-full bg-neutral-200 z-[100]"
                animate={{
                    WebkitMaskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
                    WebkitMaskSize: `${size}px`,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.75 }}
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="h-full flex flex-col gap-4 p-8">
                    <div className="title--info w-fit">
                        <ProjectTitle
                            title={title}
                            href={mainLink}
                        />
                        <h3 className="text-xl text-neutral-500"> {time} </h3>
                    </div>
                    <div className="h-full">
                        <div className="h-full w-full grid grid-rows-3 grid-cols-5 gap-2">
                            <div className="row-start-1 row-end-3 col-start-1 col-end-4 p-4 bg-gray-300 rounded flex items-center">
                                {description}
                            </div>
                            <div className="row-start-1 row-span-2 col-start-4 col-span-2 p-4 bg-gray-300 rounded flex flex-col  justify-center items-center">
                                <div className="flex flex-wrap justify-center items-center gap-2 h-fit">
                                    {
                                        chips.map((chip, index) => (
                                            <Chip key={index} {...chip} className="text-gray-700" />
                                        ))
                                    }
                                </div>
                                <span className="font-bold w-full p-2 text-center"> Tech Stack </span>
                            </div>
                            <div className="row-start-3 row-span-2 col-start-1 col-span-5 p-4 bg-gray-300 rounded flex flex-wrap justify-center items-center gap-2">
                                {
                                    links.map((link, index) => (
                                        <Link key={index} {...link} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className="flex items-center justify-center h-full w-full h-full overflow-hidden">
                <Image src={bg} alt="bg" layout="fill" objectFit="cover" className="z-[-1000]" />
                <h1 className="text-9xl font-bold text-zinc-200">{title}</h1>
            </div>
        </motion.div >
    )
}

export default Card;