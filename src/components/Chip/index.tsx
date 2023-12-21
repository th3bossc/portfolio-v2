import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconName, IconPrefix, fab } from '@fortawesome/free-brands-svg-icons';
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useMousePosition from "@/hooks/useMousePosition";

library.add(fab);
library.add(fas);



const Chip = ({
    iconType,
    icon,
    iconSize,
    tooltip,
    className,
}: {
    iconType: IconPrefix,
    icon: IconName,
    iconSize?: SizeProp,
    tooltip?: string,
    className?: string,
}) => {
    const container = useRef<HTMLDivElement>(null);
    const { x, y } = useMousePosition({ ref: container });

    const [hover, setHover] = useState(false);
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        if (container.current) {
            const { width, height } = container.current.getBoundingClientRect();

            hover ?
                setPosition({ x: x - width / 2, y: y - height / 2 }) :
                setPosition({ x: 0, y: 0 })
        }
    }, [hover, x, y])

    return (
        <div
            className="w-fit h-fit p-3 rounded flex items-center gap-4 justify-center"
            ref={container}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <motion.div
                className="flex items-center gap-2"
                animate={{ x: position.x, y: position.y }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
            >
                <FontAwesomeIcon icon={[iconType, icon]} size={iconSize ? iconSize : "xs"} />
            </motion.div>
            {
                tooltip && (
                    <motion.span
                        className={"absolute text-sm font-bold " + (className ? className : "")}
                        animate={hover ? { opacity: 1, x: position.x, y: position.y - 20 } : { opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 15,
                            mass: 0.1,
                        }}
                    >
                        {tooltip}
                    </motion.span>
                )
            }
        </div>
    )
}

export default Chip;