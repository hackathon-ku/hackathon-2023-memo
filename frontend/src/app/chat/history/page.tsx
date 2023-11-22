'use client';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdHistory } from 'react-icons/md';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import SearchInput from '../../../components/SearchBar';

const History = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  // useEffect to update state after component mounts
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen ">
      <div className="h-[10%] flex  justify-around items-center bg-neutral-200 ">
        <div></div>
        <div className="font-semibold text-lg">History</div>
        <div>
          <IoCloseOutline
            size={30}
            className="text-teal-800"
            onClick={() => router.push('/chat')}
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll max-h-[100%] ">
        <div className="p-4">
          <SearchInput/>
          <SearchInput/>
        </div>
      </div>
    </div>
  );
};

export default History;
