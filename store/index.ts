import create from 'zustand'; // create로 zustand를 불러옵니다.
import { User } from '../types/database';

import axios from 'axios';

const getUserInfo = async () => {
    const res = await axios.get('/api/auth/user');
    return res.data;
};

interface Interface_UserInfo {
    userInfo: User | null;
    setUserInfo: (state: User) => void;
    clearUserInfo: () => void;
}

const useStore = create<Interface_UserInfo>((set) => ({
    userInfo: null,
    setUserInfo: (state: User) => set({ userInfo: state }),
    clearUserInfo: () => set({ userInfo: null }),
}));

export default useStore;
