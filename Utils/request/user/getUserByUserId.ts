import axios, { AxiosError } from 'axios';

const getUserByUserId = async (userId: number) => {
    try {
        const user = await axios.get('/api/user?id=' + userId);
        return user;
    } catch (err) {
        const { response } = err as unknown as AxiosError;

        if (response) throw response;

        throw 'error';
    }
};

export default getUserByUserId;
