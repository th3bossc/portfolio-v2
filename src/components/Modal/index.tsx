import ProjectTitle from "../ProjectTitle";
import Chip from "../Chip";
import Link from "../Link";
import { chipInterface, linksInterface } from "@/types";

const Modal = ({
    title,
    mainLink,
    time,
    description,
    chips,
    links,
}: {
    title: string,
    mainLink: string,
    time: string,
    description: string,
    chips: chipInterface[],
    links: linksInterface[],
}) => {
    return (
        <>
            <div className="w-[90dvw] h-[90dvh] bg-neutral-200 rounded text-black p-4 flex flex-col items-center pt-8 gap-4 relative overflow-scroll">
                <div className="h-fit w-full p-4 flex flex-col items-center">
                    <ProjectTitle title={title} href={mainLink} />
                    <h3 className="text-xl text-neutral-500"> {time} </h3>
                </div>
                <div className="bg-gray-300 p-4">
                    {description}
                </div>
                <div className="flex flex-wrap justify-center items-center gap-2 h-fit bg-gray-300 w-full">
                    <span className="font-bold w-full p-2 text-center"> Tech Stack </span>
                    {
                        chips.map((chip, index) => (
                            <Chip key={index} {...chip} />
                        ))
                    }
                </div>
                <div className="flex justify-center items-center gap-2 bg-gray-300 rounded flex flex-wrap justify-center items-center gap-2 w-full p-4">
                    {
                        links.map((link, index) => (
                            <Link key={index} {...link} />
                        ))
                    }
                </div>
            </div >
        </>
    )
}

export default Modal;