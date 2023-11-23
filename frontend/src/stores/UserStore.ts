import {shallow} from 'zustand/shallow';
import {createWithEqualityFn} from 'zustand/traditional';
import {createJSONStorage, persist} from 'zustand/middleware';

interface Chat {
    [key: string]: string;
}

interface UserStore {
    chat: Chat;
    currentChat: string;
    isAuth: boolean;
    setChat: (chat: Chat) => void;
    setIsAuth: (isAuth: boolean) => void;
    setCurrentChat: (currentChat: string) => void;
    username: string;
    setUsername: (username: string) => void;
}

const useUserStore = createWithEqualityFn<UserStore>()(persist(
        (set, get) => ({
            chat: {},
            isAuth: false,
            currentChat: '',
            username: '',
            setChat: (chat: Chat) => set({chat}),
            setIsAuth: (isAuth: boolean) => set({isAuth}),
            setCurrentChat: (currentChat: string) => set({currentChat}),
            setUsername: (username: string) => set({username}),
        }), {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    ),
    shallow
)

export default useUserStore;
