import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Head from 'next/head';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post } from '../../types/database';
import useStore from '../../store';

import { deleteToken } from '../../Utils/tokenManager';

interface Props {
    post: Post;
}

const Footer = () => {
    const router = useRouter();
    const { userInfo } = useStore();

    return (
        <div className="bg-dark-bg-secondary p-4 pt-2 text-dark-text text-right">
            <p>
                <strong>roy2554.me</strong> made by roy2554
            </p>
            <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                <Link href="/legacy">
                    <a>legacy</a>
                </Link>
                <Link href="/blog">
                    <a>blog</a>
                </Link>
                <Link href="/">
                    <a>main</a>
                </Link>
            </div>
            <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                {userInfo ? (
                    <a
                        className="cursor-pointer"
                        onClick={async () => {
                            await axios.get(process.env.AUTH_SERVICE_URL + '/auth/signout', { withCredentials: true });
                            router.reload();
                        }}
                    >
                        sign out
                    </a>
                ) : (
                    <Link href="/auth/signin">
                        <a>sign in</a>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Footer;
