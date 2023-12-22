import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { welcomeAnimations, paragraphAnimations } from "@/animations";
import { useMemo } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import Chip from "../Chip";
import { techStackInterface } from "@/types";
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '700'] });

const About = ({ techStack }: { techStack: techStackInterface[] }) => {
    const welcomeText = useMemo(() => "Hi There!".split(""), []);
    const paragraphText = useMemo(() => [
        "I'm a full stack webdeveloper and deep learning enthusiast from India.",
        "I'm currently pursuing my B.Tech in Computer Science and Engineering from NIT Calicut",
        "My specialities include React, NextJS, Django, MongoDB, Pytorch, and more.",
        "I love collaborating with people and working on projects together."
    ], []);


    return (
        <PageWrapper className=" h-screen relative w-screen">
            <div className="p-10 xl:p-24 absolute w-full bottom-48 md:bottom-10 lg:bottom-48 flex flex-col gap-4">
                <motion.h1
                    className="text-3xl md:text-6xl xl:text-9xl font-bold"
                    initial="hidden"
                    animate="visible"
                    transition={{
                        staggerChildren: 0.08,
                    }}
                >
                    {
                        welcomeText.map((letter, index) => (
                            letter === " " ?
                                <span key={index}>&nbsp;</span> : (
                                    <motion.span
                                        className="inline-block"
                                        key={index}
                                        variants={welcomeAnimations}
                                    >
                                        {letter}
                                    </motion.span>
                                )
                        ))
                    }
                </motion.h1>

                <div className="flex justify-center items-center gap-4" >
                    <motion.div
                        className="w-full h-full"
                        initial="hidden"
                        animate="visible"
                        transition={{
                            staggerChildren: 0.1,
                            delayChildren: 0.4,
                        }}
                    >
                        {
                            paragraphText.map((text, index) => (
                                <motion.p
                                    className="text-lg max-xl:text-sm"
                                    key={index}
                                    variants={paragraphAnimations}
                                >
                                    {text}
                                </motion.p>
                            ))
                        }
                    </motion.div>

                    <div className="w-full flex flex-col">
                        <span className={"text-lg xl:text-3xl font-bold w-full p-2 text-center " + ibmPlexMono.className}>
                            &lt;My Stack /&gt;
                        </span>
                        <div className="w-full h-full flex flex-wrap text-3xl justify-center items-center">
                            {
                                techStack.map((tech, index) => (
                                    <Chip key={index} {...tech} iconSize="sm" className="text-neutral-200" />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper >
    )
}

export default About;