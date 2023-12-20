import About from "@/components/About";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import useInView from "@/hooks/isInView";
import { chipInterface, linksInterface, projectsInterface } from "@/types";

const emptyData: projectsInterface = {
    id: Infinity,
    title: "",
    description: "",
    time: "",
    mainLink: "",
    chips: [],
    links: [],
}

const Home = ({ data }: { data: { links: linksInterface[], projects: projectsInterface[], techStack: chipInterface[] } }) => {
    const [path, setPath] = useState('#about');
    const { ref: refAbout, inView: inViewAbout } = useInView();
    const { ref: refProjects, inView: inViewProjects } = useInView();
    const { ref: refContact, inView: inViewContact } = useInView();

    useEffect(() => {
        if (inViewAbout)
            setPath('#about');
        else if (inViewProjects)
            setPath('#projects');
        else if (inViewContact)
            setPath('#contact');
    }, [inViewAbout, inViewProjects, inViewContact]);

    return (
        <div className="relative">
            <div className="fixed bottom-10 md:top-10 h-fit z-[1000] w-screen flex justify-center">
                <Navbar current={path} />
            </div>
            <section id="about" ref={refAbout}>
                <About techStack={data.techStack} />
            </section>

            <section id="projects" ref={refProjects}>
                <Projects data={[emptyData, ...data.projects, emptyData]} />
            </section>

            <section id="contact" ref={refContact}>
                <Contact links={data.links} />
            </section>
        </div>
    )
}

export default Home;