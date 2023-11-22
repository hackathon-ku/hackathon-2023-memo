'use client';
import {IoArrowBackSharp} from 'react-icons/io5';
import {MdHistory} from 'react-icons/md';
import * as React from 'react';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import {FaArrowRight} from 'react-icons/fa';
import {styled} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import Message, {MessageProps, testData} from '@/components/Messages';
import {useRouter} from 'next/navigation';


const Chat = () => {
    const [dataChat, setDataChat] = useState<MessageProps[]>(testData);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    const [message, setMessage] = useState<string>("")

    // useEffect to update state after component mounts
    useEffect(() => {
        setIsReady(true);
    }, []);
    const handelSubmit = () => {
        if (!message) return
        console.log(message)
        setDataChat((prev) => [
            ...prev,
            {
                username: 'You',
                content: message,
                isNotGPT: true,
            }
        ]);
        setDataChat((prev) =>[
            ...prev,
            {
                username: 'KU Assistant',
                content: 'Hello',
                isNotGPT: false,
            }
            ]
        )
        setMessage("")

    }
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [dataChat]);
    return (
        <div className="flex flex-col w-screen h-screen ">
            <div className="h-[10%] min-h-[10%] flex  justify-around items-center bg-neutral-200 ">
                <div>
                    <IoArrowBackSharp size={25} className="text-teal-700 cursor-pointer" onClick={() => {
                        router.push('/home')
                    }}/>
                </div>
                <div>KU Assistant</div>
                <div>
                    <MdHistory size={25} onClick={() => router.push('/chat/history')}/>
                </div>
            </div>
            <div className="flex-grow overflow-y-scroll max-h-[calc(100% - 7rem)] ">
                <div className="p-4">
                    {dataChat.map((data, index) => (
                        <Message
                            key={index}
                            username={data?.username}
                            content={data?.content}
                            isNotGPT={data?.isNotGPT}
                            uid={data?.uid}
                        />
                    ))}
                    <div ref={messageEndRef}>
                    </div>
                </div>
            </div>
            <div className=" bg-neutral-900 relative min-h-[10%] flex-shrink-0 max-h-[7rem]  py-2 flex  ">
                <div className=" flex w-10/12 items-center justify-center  ms-2 ">
                    {isReady && (
                        <TextareaAutosize
                            onChange={(e) => {
                                setMessage(e.target.value)
                            }}
                            value={message}
                            aria-label="empty textarea"
                            placeholder="Messages KU Assistant..."
                            className="text-[0.875rem] max-h-[6rem] p-3 bg-neutral-200 w-11/12 rounded-xl resize-none"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handelSubmit();
                                }
                            }}
                        />
                    )}
                </div>

                <div className="flex items-center w-2/12 justify-center ">
                    ` <FaArrowRight size={20} className="text-white cursor-pointer" onClick={handelSubmit}/>
                </div>
            </div>
        </div>
    );
};

export default Chat;
