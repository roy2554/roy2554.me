import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Post, User } from '../../types/database';
import MiniPost from '../../components/MiniPost';

import useStore from '../../store';

import cookie from 'react-cookies';
import Button from '../../components/MK2/Button';

import { useInfiniteQuery } from 'react-query';

const Home: NextPage = () => {
    const router = useRouter();

    const { userInfo }: { userInfo: User | null } = useStore();

    const [blogPosts, setBlogPosts] = useState<Post[]>([]);
    const [jwt, setJwt] = useState('');

    useEffect(() => {
        // console.log('COOKIE: ', cookie.load('jsonwebtoken'));
        setJwt(cookie.load('jsonwebtoken'));
    }, [cookie.load('jsonwebtoken')]);

    useEffect(() => {
        const asyncFunc = async () => {
            // const jwt = axios.defaults.headers.common['Authorization'];
            // console.log('JWT:', jwt);

            // const res = await axios.get(`/api/post/`); => if request to '/api/post/', it won't work on IOS, so request to 'api/post' instead
            const res = await axios.get(`/api/post`);
            // console.log(res);
            // console.log(res);
            setBlogPosts(res.data);
        };

        // console.log('=====');
        // console.log('AXIOS:', axios.defaults.headers);
        // axios.get('/api/post/').then(({ data, config }) => {
        //     console.log(data);
        //     console.log(config.headers);
        //     setBlogPosts(data);
        // });
        asyncFunc();
    }, [jwt]);

    // useEffect(() => {
    //     console.log(blogPosts);
    // }, [blogPosts]);

    return (
        <div>
            <Head>
                <title>roy2554 blog</title>
                <meta name="title" content="roy2554" />
                <meta name="description" content="roy2554's profile page" />
            </Head>

            <div className="pb-4">
                <div className="flex flex-col items-center">
                    <p className="text-3xl font-extrabold">roy2554 blog</p>
                </div>

                {/* TODO: Lazy Loading */}
                <div className="">
                    <div className="grid grid-cols-1 gap-4 justify-items-center">
                        {userInfo && (
                            <Button
                                color="primary"
                                onClick={() => {
                                    router.push('/blog/mk/post');
                                }}
                            >
                                {<FontAwesomeIcon icon={faPenToSquare} />} Create a new post
                            </Button>
                        )}
                        {blogPosts && blogPosts.map((blogPost, index) => <MiniPost post={blogPost} key={`mini-post-${index}`} />)}
                    </div>
                </div>
            </div>

            {/* <div className="h-screen flex items-center justify-center text-center text-dark-text flex-col">
                <div className="alert">
                    <div className="bg-dark-bg-secondary w-full p-4 rounded-md mb-8">
                        want to visit my legacy page?{' '}
                        <Link href="/legacy">
                            <a className="underline hover:cursor-pointer">click here</a>
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <p className="text-3xl font-extrabold">roy2554 blog</p>
                    </div>
                    <div className="justify-center flex flex-row space-x-4">
                        <a className="hover:cursor-pointer">sign up</a>
                        <a className="hover:cursor-pointer">sign in</a>
                        <a className="hover:cursor-pointer">new post</a>
                    </div>
                </div>
                <div className="p-4" />
                <div className="justify-center flex flex-col sm:flex-row space-x-0 sm:space-x-16 space-y-4 sm:space-y-0 px-4">
                    <div className="posts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {blogPosts && blogPosts.map((post, idx) => <MiniPost id={post.id} key={`mini-post-${idx}`} />)}
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Home;
