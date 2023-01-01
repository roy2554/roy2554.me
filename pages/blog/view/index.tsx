import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEyeSlash, faIdBadge } from '@fortawesome/free-regular-svg-icons';

import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Post, User } from '../../../types/database';
import getUserByUserId from '../../../Utils/request/user/getUserByUserId';

const Viewer: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [post, setPost] = useState<Post | null>(null);
    const [author, setAuthor] = useState<User | null>(null);

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
                    getUserByUserId(res.data[0].authorId)
                        .then((res) => {
                            // console.log('RES', res);
                            setAuthor(res.data);
                        })
                        .catch((err) => {});
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
                <meta name="description" content={'roy2554 blog - viewer'} />
            </Head>

            <div className="pb-4">
                <div className="flex flex-col items-center">
                    {(post?.isPrivate || !post?.published) && (
                        <div className="pt-4">
                            <a className="truncate font-extralight text-sm">
                                <FontAwesomeIcon className="text-[0.7rem]" icon={faEyeSlash} /> this is{' '}
                                {post?.isPrivate ? 'private post' : !post?.published ? 'not published post' : ''}
                            </a>
                        </div>
                    )}
                    <p className="text-3xl font-extrabold">{post?.title || 'Loading…'}</p>
                </div>

                <div className="flex items-center justify-center">
                    <a>by {author?.username}</a>
                </div>

                <div className="grid auto-cols-auto gap-4 justify-items-center p-2 overflow-auto object-scale-down">
                    {post && <div className="postViewClass" dangerouslySetInnerHTML={{ __html: post.content || '' }} />}
                </div>
            </div>
        </div>
    );
};

export default Viewer;
