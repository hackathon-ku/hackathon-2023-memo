'use client';
import {IoArrowBackSharp} from 'react-icons/io5';
import {MdHistory} from 'react-icons/md';
import * as React from 'react';
import {useEffect, useState} from 'react';

import {IoCloseOutline} from 'react-icons/io5';
import {useRouter} from 'next/navigation';
import SearchInput from '../../../components/SearchBar';
import CardHistory from '../../../components/history/CardHistory';
import useUserStore from "@/stores/UserStore";
import {router} from "next/client";
import useSWR from "swr";
import BaseUrl from "@/config/baseUrl";

const testdata = ["แนะนำวิชาตัวต่อของวิชาEng 4 หน่อย", "ฉันจะได้เรียนวิชาระบบปฏิบัติการตอนปีไหน"]
const fetcher = async (url: string) => {
    try {
        const res = await BaseUrl.get(url);
        return res.data ;
    } catch (err) {
        throw err;
    }
};
export interface HistoryData {
    [key: string]: string
}
const History = () => {
    const {username,setChat} = useUserStore(state => ({username: state.username,setChat:state.setChat}))
    const  {data,error,isLoading} = useSWR<HistoryData>(`/history/${username}`, fetcher)
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
    const [fillterData, setFillterData] = useState<{ key: string; value: string }[]>([]);

    // useEffect to update state after component mounts
    useEffect(() => {
        setIsReady(true);
    }, []);
    useEffect(() => {
        setChat(data as HistoryData)
        setFillterData(Object.entries(data || {}).map(([key, value]) => ({ key, value })));
    }, [data]);
    const {chat} = useUserStore((state) => ({
        chat: state.chat,
    }));
    // console.log(data)
    const handleSearchChange = (event: React.SyntheticEvent, value: string) => {
        const filtered = Object.entries(data || {})
            .filter(([key, val]) => val.toLowerCase().includes(value.toLowerCase()))
            .map(([key, value]) => ({ key, value }));

        setFillterData(filtered);
    };

return (
    <div className="flex flex-col w-screen h-screen ">
        <div className="h-[10%] flex  justify-around items-center bg-neutral-200 ">
            <div></div>
            <div className="font-semibold text-lg">History</div>
            <div>
                <IoCloseOutline
                    size={30}
                    className="text-teal-800"
                    onClick={() => router.push('/chat?chatId=newChat')}
                />
            </div>
        </div>
        <div className="flex-grow overflow-y-scroll max-h-[100%] ">
            <div className="p-4 h-full" >
                <SearchInput className='h-14 mb-14' data={Object.values(data||{})} onChange={handleSearchChange}
                />
                <div className={"flex flex-col gap-4 h-full overflow-y-scroll "}>
                    {

                        fillterData.map((data, index) => {
                            return <CardHistory key={index} chatId={data.key} name={data.value}/>
                        }
                        )
                    }
                </div>

            </div>
        </div>
    </div>
);
}



export default History;
