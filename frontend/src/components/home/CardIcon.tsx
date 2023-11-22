import {Avatar} from "@mui/material";
import {FC} from "react";

interface CardIconProps {
    iconName: string;
    link?: string;
}

const CardIcon: FC<CardIconProps> = ({iconName="cat", link}) => {
    return (
        <div className="flex flex-col items-center justify-center w-full ">
            <Avatar sx={{width:65,height:65}} alt="Remy Sharp" src={link} className={"mb-2"}/>
            <div className="text-center text-sm">{iconName}</div>
        </div>
    )
}
export default CardIcon;