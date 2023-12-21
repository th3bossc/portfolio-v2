import PageWrapper from "@/components/PageWrapper";
import { IBM_Plex_Mono } from "next/font/google";
import { linksInterface } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useAnimation } from "framer-motion";
import { linkAnimations } from "@/animations";
import useInView from "@/hooks/isInView";
import { useState, useEffect } from "react";
import { codeAnimation } from "@/animations";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from "next/navigation";
import EasterEgg from "../EasterEgg";
library.add(fab);
library.add(fas);

const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '700'] });

const Contact = ({ links }: {
    links: linksInterface[],
}) => {
    const { ref, inView } = useInView();
    const controls = useAnimation();
    const router = useRouter();
    const [play, setPlay] = useState(false);
    useEffect(() => {
        if (inView)
            controls.start("visible");
        else
            controls.start("hidden");
    }, [inView, controls]);

    return (
        <PageWrapper className="flex flex-col justify-center items-center h-screen">
            {
                play && (
                    <EasterEgg back={setPlay} />
                )
            }
            <motion.div
                className={"text-xl md:text-3xl flex flex-col w-fit h-fit p-4 " + ibmPlexMono.className}
                ref={ref}
                animate={controls}
                initial="hidden"
                transition={{
                    duration: 0.5,
                    staggerChildren: 0.2,
                }}
            >
                <motion.span
                    className=""
                    variants={codeAnimation}
                >
                    <span className="text-purple-300"> while </span>
                    <span className="text-neutral-100"> (alive) </span>
                    <span className="text-blue-300"> {"{"} </span>
                </motion.span>
                <motion.span
                    className="ps-5 text-blue-300"
                    variants={codeAnimation}
                >
                    eat
                    <span className="text-green-300">()</span>;
                </motion.span>
                <motion.span
                    className="ps-5 text-blue-300"
                    variants={codeAnimation}
                >
                    sleep
                    <span className="text-green-300">()</span>;
                </motion.span>
                <motion.span
                    className="ps-5 text-blue-300"
                    variants={codeAnimation}
                >
                    code
                    <span className="text-green-300">()</span>;
                </motion.span>
                <motion.span
                    className="ps-5 text-blue-300"
                    variants={codeAnimation}
                >
                    repeat
                    <span className="text-green-300">()</span>;
                </motion.span>
                <motion.span
                    className="text-blue-300"
                    variants={codeAnimation}
                >
                    {"} "}
                    <motion.span
                        className="text-md md:text-2xl ms-2 ps-1 pe-1 bg-white"
                        animate={{ opacity: [0, 1, 0] }}
                        onClick={() => setPlay(true)}
                        transition={{
                            repeat: Infinity,
                            duration: 1,
                            type: "backOut",
                        }}
                    />
                </motion.span>
            </motion.div>

            <motion.div
                className="links flex gap-2 md:gap-6 mt-5 p-4 items-center justify-center"
                initial="hidden"
                animate={controls}
                transition={{
                    staggerChildren: 0.1,
                    delayChildren: 0.4,
                }}
            >
                <motion.span
                    variants={linkAnimations}
                    className="text-md md:text-lg font-bold"
                >
                    @Diljith P D 2023
                </motion.span>
                {
                    links.map((link, index) => (
                        <motion.a
                            href={link.href}
                            variants={linkAnimations}
                            key={index}
                            target="_blank"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {link.icon && <FontAwesomeIcon icon={[link.iconType, link.icon]} size="lg" className="p-2" />}
                        </motion.a>
                    ))
                }
            </motion.div>
            <motion.span
                animate={controls}
                initial="hidden"
                variants={linkAnimations}
                className="text-md md:text-lg font-bold mt-5 text-center"
            >
                This site is made using
                <a className="font-bold text-orange-400" href="https://nextjs.org/" target="_blank"> Next.js</a>,
                <a className="font-bold text-orange-400" href="https://tailwindcss.com/" target="_blank"> TailwindCSS</a>, and
                <a className="font-bold text-orange-400" href="https://www.framer.com/motion/" target="_blank"> Framer Motion</a>.
            </motion.span>
        </PageWrapper >
    )
}

export default Contact;