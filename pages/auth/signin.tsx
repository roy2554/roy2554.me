import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Head from 'next/head';

import axios from 'axios';
import { useEffect, useState } from 'react';

const SignIn = () => {
    const router = useRouter();
    return (
        <div>
            <form action="/api/auth/signin" method="POST">
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
