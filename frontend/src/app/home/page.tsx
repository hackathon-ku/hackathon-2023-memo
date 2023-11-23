"use client"
import CardIcon from "@/components/home/CardIcon";
import {FaHome, FaSearch} from "react-icons/fa";
import React from "react";
import {IoPersonSharp} from "react-icons/io5";
import {useRouter} from "next/navigation";

const Home = () => {
    const router = useRouter()


    return (
        <div className="w-screen h-screen flex flex-col ">
            <div className={"h-[10%]"}></div>
            <div className={"flex flex-wrap p-4 h-3/6 gap-y-1 justify-between  content-start"}>
                <div className={"w-1/3 h-32 cursor-pointer"} onClick={()=>{
                    router.push("/chat?chatId=newChat")
                }} >
                    <CardIcon link={"/KuAssistant.JPG"} iconName={"KU Assistant"}/>
                </div>
                <div className={"w-1/3  h-32"}>
                    <CardIcon iconName={"About KU"}/>
                </div>
                <div className={"w-1/3 h-32"}>
                    <CardIcon iconName={"KU News"}/>
                </div>
                <div className={"w-1/3 h-32"}>
                    <CardIcon  iconName={"KU Event"}/>
                </div>
                <div className={"w-1/3 h-32"}>
                    <CardIcon iconName={"Library"}/>
                </div>
                <div className={"w-1/3 h-32"}>
                    <CardIcon iconName={"Check in"}/>
                </div>
                <div onClick={()=>{
                    router.push("/login")
                    sessionStorage.clear()

                }} className={"w-1/3 h-32 cursor-pointer"}>
                    <CardIcon  iconName={"Logout"}/>
                </div>

            </div>
            <div className={"flex-grow"}>

            </div>
            <div className={"h-[10%] flex justify-evenly items-center w-full self-end bg-[#2C2C2C] "}>
                <div>
                    <FaHome size={50} className={"text-[#B0B922]"}/>
                </div>
                <div>
                    <FaSearch size={50} className={"text-white"}/>
                </div>
                <div>
                    <IoPersonSharp size={50} className={"text-white"} />
                </div>
            </div>
        </div>)
}
export default Home