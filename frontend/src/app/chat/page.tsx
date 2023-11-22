'use client';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdHistory } from 'react-icons/md';
import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FaArrowRight } from 'react-icons/fa';
import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
import Message from '@/components/Messages';
import { useRouter } from 'next/navigation';

const Chat = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  // useEffect to update state after component mounts
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen ">
      <div className="h-[10%] flex  justify-around items-center bg-neutral-200 ">
        <div>
          <IoArrowBackSharp size={25} className="text-teal-700" />
        </div>
        <div>KU Assistant</div>
        <div>
          <MdHistory size={25} onClick={() => router.push('/chat/history')} />
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll max-h-[calc(100% - 7rem)] ">
        <div className="p-4">
          <Message
            username="KU Assistant"
            content="Hello, I'm KU Assistant. How can I help you?"
            isNotGPT={false}
          />
          <Message
            username="test"
            content="Hello, I'm KU Assistant. How can I help you?"
            isNotGPT={true}
          />
        </div>
      </div>
      <div className=" bg-neutral-900 relative min-h-[10%] flex-shrink-0 max-h-[7rem]  py-2 flex  ">
        <div className=" flex w-10/12 items-center justify-center  ms-2 ">
          {isReady && (
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Messages KU Assistant..."
              className="text-[0.875rem] max-h-[6rem] p-3 bg-neutral-200 w-11/12 rounded-xl resize-none"
            />
          )}
        </div>

        <div className="flex items-center w-2/12 justify-center ">
          ` <FaArrowRight size={20} className="text-white " />
        </div>
      </div>
    </div>
  );
};

export default Chat;
