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
import ModalComponent from '../../../../components/Modal';
import Editor from '../../../../components/MK2/Editor';
import Input from '../../../../components/MK2/Input';

const Home: NextPage = () => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isPublished, setIsPublished] = useState(true);
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState('');
    const [watchPermission, setWatchPermission] = useState(0);

    const uploadPost = async (isAnonymous?: boolean, published?: boolean, isPrivate?: boolean, password?: string, watchPermission?: number) => {
        const res = await axios.post('/api/post', {
            title,
            content,
            isAnonymous,
            published,
            isPrivate,
            password,
            watchPermission,
        });
        console.log(res);
    };

    useEffect(() => {}, []); // check user auth

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

                <div className="grid auto-cols-auto gap-4 justify-items-center">
                    {/* <input
                        type="text"
                        placeholder="title"
                        className="w-96"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    /> */}
                    <Input
                        type="text"
                        placeholder="title"
                        className="w-96"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    {/* <Tiptap setContent={setContent} /> */}
                    <div>
                        {/* <Editor className="w-full" onChange={setContent} placeholder="write down something…" /> */}
                        <Editor description={content} setDescription={setContent} />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div>
                        <a>anonymous</a>
                        <input type="checkbox" onChange={(e) => setIsAnonymous(e.target.checked)} />
                    </div>
                    <div>
                        <a>publish</a>
                        <input type="checkbox" onChange={(e) => setIsPublished(e.target.checked)} defaultChecked />
                    </div>
                    <div>
                        <a>private</a>
                        <input type="checkbox" onChange={(e) => setIsPrivate(e.target.checked)} />
                    </div>
                    <div>
                        <a>password</a>
                        <input type="text" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <a>watchPermission</a>
                        <input type="number" onChange={(e) => setWatchPermission(Number(e.target.value))} />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            uploadPost(isAnonymous, isPublished, isPrivate, password, watchPermission);
                        }}
                    >
                        Upload
                    </button>
                </div>

                <input
                    type={'file'}
                    multiple
                    onChange={(e) => {
                        console.log(e.target.files);
                        const itemsLen = e.target.files?.length;
                        if (itemsLen && e.target.files) {
                            for (let i = 0; i < itemsLen; i++) {
                                const file = e.target.files[i];

                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    console.log(reader.result);
                                };
                                const formDate = new FormData();
                                formDate.append('file', file);
                                axios
                                    .post('/api/media', formDate, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                        },
                                    })
                                    .then((res) => {
                                        console.log(res);
                                    });
                            }
                        }
                    }}
                />

                <div>{title}</div>
                <div>{content}</div>
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
