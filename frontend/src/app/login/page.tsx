'use client';
import TextField from '@mui/material/TextField';
import {InputAdornment} from '@mui/material';
import {IconButton} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {InputLabel} from '@mui/material';
import {OutlinedInput} from '@mui/material';
import {FormControl} from '@mui/material';
import {useState, useRef} from 'react';
import CryptoJS from 'crypto-js';
import {useRouter} from "next/navigation";
import baseUrl from "@/config/baseUrl";
import useUserStore from "@/stores/UserStore";

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState<string|undefined>("");
    const [showPassword, setShowPassword] = useState(false);
    const accountNontriRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const {isAuth,setIsAuth,setUsername,setChat} = useUserStore(state => ({
        isAuth: state.isAuth,
        setIsAuth: state.setIsAuth,
        setUsername: state.setUsername,
        setChat: state.setChat
    }))
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const handleSubmit = async () => {
        const accountNontriValue = accountNontriRef.current?.value;
        const passwordValue = passwordRef.current?.value;
        if (!accountNontriValue || !passwordValue) return;
        const hashedPassword = CryptoJS.SHA256(passwordValue).toString();
        console.log(hashedPassword)
        try {
            const res = await baseUrl.post("/login", {
              username: accountNontriValue,
              password: hashedPassword
            })
            console.log("res",res)
            if (res.status === 200) {
                console.log("pass",res)
                setError("")
                setIsAuth(res.data.isauth)
                setChat(res.data.chat)
                setUsername(accountNontriValue)
                router.push("/home")
            }

        } catch (e) {
            setError("Account Nontri or Password is incorrect")
            console.log(e)
        }
        // console.log(`Account Nontri: ${accountNontriValue}, Password: ${passwordValue}, Hashed Password: ${hashedPassword}`);
    };
    return (
        <div className="flex flex-col items-center justify-evenly h-screen w-screen ">
            <div>
                <div className="font-semibold text-[40px] flex flex-col items-center justify-center mb-10 gap-y-4">
                    <span>Login</span>
                    <div className="text-[20px]">with Account Nontri</div>
                </div>
                <div className='mb-10'>
                    <div className='flex items-center justify-center mb-2'>
                        <TextField
                            id="outlined-basic"
                            label="Account Nontri"
                            type="text"
                            inputRef={accountNontriRef}
                            sx={{width: '200px'}}
                        />
                    </div>
                    <div className='flex items-center justify-center mb-2'>
                        <FormControl sx={{m: 1, width: '200px'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputRef={passwordRef}
                            />
                        </FormControl>
                    </div>
                    {error && <div className="text-red-500 text-[20px] mt-2">{error}</div>}
                </div>

                <div className="flex justify-center items-center">
                    <button onClick={handleSubmit}
                            className="bg-[#B0B922] text-[32px] font-semibold text-neutral-100 rounded-3xl px-6 py-4">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
