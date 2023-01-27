import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faIdBadge } from '@fortawesome/free-regular-svg-icons';

import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Post, User } from '../../../../types/database';
import getUserByUserId from '../../../../Utils/request/user/getUserByUserId';
import Editor from '../../../../components/MK2/Editor';
import Input from '../../../../components/MK2/Input';

const Viewer: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [post, setPost] = useState<Post | null>(null);
    const [author, setAuthor] = useState<User | null>(null);

    const [modifiedTitle, setModifiedTitle] = useState<string>();
    const [modifiedContent, setModifiedContent] = useState<string>();

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
                    setModifiedTitle(res.data[0].title);
                    setModifiedContent(res.data[0].content);
                    getUserByUserId(res.data[0].authorId)
                        .then((res) => {
                            console.log('RES', res);
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
                <title>roy2554 blog - modify a post</title>
                <meta name="title" content="roy2554 blog" />
                <meta name="description" content="roy2554 blog - modify a post" />
            </Head>

            <div className="pb-4">
                <Input
                    type="text"
                    placeholder="title"
                    className="w-full "
                    value={modifiedTitle}
                    onChange={(e) => {
                        setModifiedTitle(e.target.value);
                    }}
                />
                <Editor description={modifiedContent} setDescription={setModifiedContent} />
            </div>
        </div>
    );
};

export default Viewer;
