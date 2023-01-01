import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Head from 'next/head';

import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { setToken } from '../../Utils/tokenManager';

const SignIn = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [positiveEvent, setPositiveEvent] = useState<string | null>(null);

    const signin = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = event.currentTarget.email?.value;
        const password = event.currentTarget.password?.value;

        try {
            // console.log('REQUEST TO ' + process.env.AUTH_SERVICE_URL + '/auth/signin');
            const res = await axios.post(process.env.AUTH_SERVICE_URL + '/auth/signin', { email, password }, { withCredentials: true });
            // console.log('RES:', res);
            if (res.status == 200) {
                setPositiveEvent('success');
                setToken(res.data.accessToken);
                router.push('/');
            }
        } catch (err: AxiosError | any) {
            // console.log('AUTH FAILED');
            // console.log(err);
            setError(err.message);
        }
    };

    return (
        <div>
            <div className="p-2 md:p-4">
                {positiveEvent && <p className="p-2 md:p-4 rounded-md bg-green-500">{positiveEvent}</p>}
                {error && <p className="p-2 md:p-4 rounded-md bg-red-500">{error}</p>}
            </div>
            <div className="flex flex-col items-center">
                <p className="text-3xl font-bold">Sign In</p>
            </div>
            <form onSubmit={signin} className="flex flex-col items-center">
                <div className="flex flex-col items-left">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="flex flex-col items-left">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <br />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
