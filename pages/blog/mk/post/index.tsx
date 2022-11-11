import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Post } from '../../../../types/database';
import MiniPost from '../../../../components/MiniPost';
import Tiptap from '../../../../components/Editor';

const Home: NextPage = () => {
    const router = useRouter();

    const [blogPosts, setBlogPosts] = useState<Post[]>([]);

    useEffect(() => {
        const asyncFunc = async () => {
            const res = await axios.get('/api/post/unauthorized');
            // console.log(res);
            setBlogPosts(res.data);
        };
        asyncFunc();
    }, []);

    const [content, setContent] = useState('');

    return (
        <div>
            <Head>
                <title>roy2554 blog - create a new post</title>
                <meta name="title" content="roy2554" />
                <meta name="description" content="roy2554 blog - create a new post" />
            </Head>

            <div className="pb-4">
                <div className="flex flex-col items-center">
                    <p className="text-3xl font-extrabold">create a new post</p>
                </div>

                {/* TODO: Lazy Loading */}
                <div className="grid auto-cols-auto gap-4 justify-items-center">
                    <Tiptap setContent={setContent} />
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
