
import { Avatar } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { AiOutlineFileText } from 'react-icons/ai';



export type MessageProps = {
  username: string;
  content: string ;
  isNotGPT: boolean;
  type?: 'text';
  uid?: string;
  loading?: boolean;
  firstload?: boolean;
};
const TypingEffect = ({ message,loading }:{ message:string,loading:boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 20; // Speed in milliseconds
  const [stillTyping, setStillTyping] = useState(true);
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
  return (
      <div className="typing-effect">
        {displayedText}
        {loading && <span className="blink-cursor">|</span>}
        {!loading && stillTyping && (<span className="blink-cursor">|</span>)}
      </div>
  );
};

const Message: React.FC<MessageProps> = ({
  username,
  content,
  isNotGPT,
  type = 'text',
  uid,
  loading = false,
  firstload
}) => {

  console.log("firstload",firstload)
  console.log("loading",loading)

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
        <p className={"text-sm text-gray-600"+(isNotGPT ? 'bg-teal-600 text-white text-right ' : 'bg-gray-200 text-black')}>{username}</p>
        <div className="whitespace-pre-line">
          {
            !isNotGPT ? (firstload? content:<TypingEffect loading={loading} message={content}/>):content
          }
        </div>
      </div>
    </div>
  );
};
export const  testData : MessageProps[]=[
  {
    username:"KU Assistant",
    content:"Hello, I'm KU Assistant. How can I help you?",
    isNotGPT:false

  },
]
export default Message;
