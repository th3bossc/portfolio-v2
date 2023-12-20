import { useState } from "react";
import AnimatedLink from "../AnimatedLink";



const ProjectTitle = ({ title, href }: { title: string, href: string }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            className="relative cursor-pointer overflow-hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <AnimatedLink title={title} href={href} top={true} hovered={hovered} />
            <div className="absolute top-0">
                <AnimatedLink title={title} href={href} top={false} hovered={hovered} />
            </div>
        </div>
    )
}

export default ProjectTitle;