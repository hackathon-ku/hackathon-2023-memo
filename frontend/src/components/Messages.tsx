import {Avatar} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineFileText} from 'react-icons/ai';


export type MessageProps = {
    username: string;
    content: string;
    isNotGPT: boolean;
    type?: 'text';
    uid?: string;
    firstload?: boolean;
    islast?: boolean;
};
const TypingEffect = ({message}: { message: string }) => {
    const [displayedText, setDisplayedText] = useState('');
    const typingSpeed = 20; // Speed in milliseconds
    const [stillTyping, setStillTyping] = useState(true);
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // console.log(loading)
        if (message.length > displayedText.length) {

            const timer = setTimeout(() => {
                setDisplayedText(message.slice(0, displayedText.length + 1));
            }, typingSpeed);
            return () => clearTimeout(timer);
        }
        setStillTyping(false);
    }, [displayedText, message]);
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [displayedText]);
    return (
        <div className="typing-effect">
            {displayedText}
            {stillTyping && (<span  className="blink-cursor ">|</span>)}
            <div ref={endOfMessagesRef} />
        </div>
    );
};

const Message: React.FC<MessageProps> = ({
                                             username,
                                             content,
                                             isNotGPT,
                                             type = 'text',
                                             uid,
                                             firstload,
                                             islast
                                         }) => {


    return (
        <div
            className={`flex ${
                isNotGPT ? 'justify-end' : 'justify-start'
            } mb-4 space-x-2`}
        >
            <div
                className={`max-w-lg px-4 py-2 rounded-md break-words  ${
                    isNotGPT ? 'bg-teal-600 text-white' : 'bg-gray-200 text-black'
                }`}
            >
                <p className={"text-sm text-gray-600" + (isNotGPT ? 'bg-teal-600 text-white text-right ' : 'bg-gray-200 text-black')}>{username}</p>
                <div className="whitespace-pre-line">
                    {
                        !isNotGPT ? (firstload ? content : (
                                islast ?
                                    (<TypingEffect message={content}/>) :
                                    content
                            )
                        ) : content
                    }
                </div>
            </div>
        </div>
    );
};
export const testData: MessageProps[] = [
    {
        username: "KU Assistant",
        content: "Hello, I'm KU Assistant. How can I help you?",
        isNotGPT: false

    },
]
export default Message;
