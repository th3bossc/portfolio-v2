import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";

const Message = ({ text, color, handler }: {
    text: string,
    color: string
    handler: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <div className={`mt-10 bg-${color}-500 p-4 rounded flex gap-5`}>
            <p className="text-gray-900 font-bold"> {text} </p>
            <button className="text-gray-900 font-bold" onClick={() => handler(false)}>
                <FontAwesomeIcon icon={faX} />
            </button>
        </div>
    )
}

export default Message;