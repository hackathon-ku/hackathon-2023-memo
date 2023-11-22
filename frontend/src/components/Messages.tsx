
import { Avatar } from '@mui/material';
import React, { useEffect } from 'react';
import { AiOutlineFileText } from 'react-icons/ai';



export type MessageProps = {
  username: string;
  content: string ;
  isNotGPT: boolean;
  type?: 'text';
  uid?: string;
};

const Message: React.FC<MessageProps> = ({
  username,
  content,
  isNotGPT,
  type = 'text',
  uid,
}) => {
  
//   const [userEachMessage, setUserEachMessage] =
//     React.useState<IUserInProject>();
//   const currentProject = useProjectStore((state) => state.currentProject);
//   useEffect(() => {
//     if (currentProject && uid) {
//       const allUser = [
//         ...currentProject.advisee,
//         ...currentProject.advisors,
//         ...currentProject.co_advisors,
//       ] as IUserInProject[];
//       // console.log("allUser",allUser)
//       const user = allUser.find((user: IUserInProject) => user._id === uid);
//       // console.log("user",user)
//       setUserEachMessage(user);
//     }
//   }, [uid, currentProject]);

  
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
        <p className={"text-sm text-gray-600"+(isNotGPT ? 'bg-teal-600 text-white' : 'bg-gray-200 text-black')}>{username}</p>
        <p className="whitespace-pre-line">{content as string}</p>
      </div>
    </div>
  );
};

export default Message;
