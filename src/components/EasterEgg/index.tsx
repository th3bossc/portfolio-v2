import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PanInfo, motion, useAnimate } from "framer-motion";
import { useRouter } from "next/navigation";
const EasterEgg = ({
    back
}: {
    back: Dispatch<SetStateAction<boolean>>,
}) => {
    const container = useRef(null);
    const [scope, _] = useAnimate();
    const [count, setCount] = useState(-1);
    const router = useRouter();
    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (Math.abs(info.velocity.x) > 500 && Math.abs(info.velocity.y) > 500)
            setCount(0);
    }


    useEffect(() => {
        (count === 5) && router.push("/admin")
    }, [count, router]);


    return (
        <div className="h-screen w-screen fixed bottom-0 flex items-center justify-center backdrop-blur z-[1000]">
            <div className="h-[80dvh] w-[80dvw] md:h-[500px] md:w-[800px] outline relative flex items-center justify-center" ref={container}>
                <button onClick={() => back(false)} className="absolute top-4 left-4">Back</button>
                <motion.h1
                    className="text-xl md:text-6xl"
                    drag
                    dragConstraints={container}
                    ref={scope}
                    onDragEnd={handleDragEnd}
                    whileTap={count >= -1 ? { scale: 0.9 } : { scale: 1 }}
                    onClick={() => setCount(prev => prev + (prev >= 0 ? 1 : 0))}
                >
                    🐰
                </motion.h1>
                <h2 className="text-xl md:text-6xl"> Hi I am Bunny </h2>
            </div>
        </div>
    )
}

export default EasterEgg;