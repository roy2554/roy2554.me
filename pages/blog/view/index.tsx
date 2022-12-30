import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Post } from '../../../types/database';

const Viewer: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/post`, {
                    params: {
                        id: id,
                    },
                })
                .then((res) => {
                    // console.log(res);
                    setPost(res.data[0]);
                })
                .catch((err) => {
                    // console.log(err);
                });
        }
    }, [id]); // check user auth

    return (
        <div>
            <Head>
                <title>roy2554 blog - {post?.title}</title>
                <meta name="title" content={post?.title} />
                <meta name="description" content="roy2554 blog - content" />
            </Head>

            <div className="pb-4">
                <div className="flex flex-col items-center">
                    <p className="text-3xl font-extrabold">{post?.title || 'Loading…'}</p>
                </div>

                <div className="grid auto-cols-auto gap-4 justify-items-center p-2 overflow-auto object-scale-down">
                    {post && <div className="postViewClass" dangerouslySetInnerHTML={{ __html: post.content || '' }} />}
                </div>
            </div>
        </div>
    );
};

export default Viewer;
