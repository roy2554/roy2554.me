import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Head from 'next/head';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post } from '../../types/database';

interface Props {
    id: number;
}

const MiniPost = ({ id }: Props) => {
    const router = useRouter();

    const [blogPost, setBlogPost] = useState<Post>();

    useEffect(() => {
        const asyncFunc = async () => {
            const res = await axios.get(`/api/post/unauthorized/?id=${id}`);
            // console.log(res);
            setBlogPost(res.data[0]);
        };
        asyncFunc();
    }, []);

    return (
        <div
            className={`${
                blogPost ? null : 'animate-pulse'
            } text-dark-text p-2 bg-dark-bg-secondary rounded-md max-w-xs w-full hover:cursor-pointer hover:bg-dark-bg-secondary-hover duration-200 px-4`}
        >
            <p className="truncate font-bold text-lg">{blogPost?.title ?? 'Loading'}</p>
            {blogPost?.content ? <p className="truncate fond-light text-sm">{blogPost?.content ?? 'Loading'}</p> : null}
        </div>
    );
};

export default MiniPost;
