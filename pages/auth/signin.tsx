import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Head from 'next/head';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { setToken } from '../../Utils/tokenManager';

const SignIn = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const signin = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = event.currentTarget.email?.value;
        const password = event.currentTarget.password?.value;

        const res = await axios.post('/api/auth/signin', { email, password });

        console.log(res);

        if (res.status == 200) {
            setError('success');
            setToken(res.data.accessToken);
        } else {
            console.log('AUTH FAILED');
            console.log(res);
            setError(res.data.message);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={signin}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
