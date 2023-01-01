import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import Head from 'next/head';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post, User } from '../../types/database';
import getUserByUserId from '../../Utils/request/user/getUserByUserId';

interface Props {
    post: Post;
}

const MiniPost = ({ post }: Props) => {
    function parseHTML(html: string) {
        const yeArr: string[] = [];
        var t = document.createElement('template');
        t.innerHTML = html;
        t.content.childNodes.forEach((node) => {
            yeArr.push(node.textContent || '');
        });
        return yeArr.join(' ') || '';
    }

    const [author, setAuthor] = useState<User | null>(null);

    useEffect(() => {
        getUserByUserId(post?.authorId).then((res) => {
            setAuthor(res?.data);
        });
    }, [post]);

    // const parser = new DOMParser();
    // const html = parser.parseFromString(post.content || '<a>no contents</a>', 'text/html');
    // console.log(html.textContent);
    const postContent = parseHTML(post.content || '');

    return (
        <Link href={`/blog/view?id=${post.id}`}>
            <div
                className={`${
                    post ? null : 'animate-pulse'
                } text-dark-text p-2 bg-dark-bg-secondary rounded-md max-w-xs w-full hover:cursor-pointer hover:bg-dark-bg-secondary-hover duration-200 px-4`}
            >
                <div className="flex flex-col space-y-0 pt-2">
                    {(post.isPrivate || !post.published) && (
                        <a className="truncate font-extralight text-sm">
                            <FontAwesomeIcon className="text-[0.7rem]" icon={faEyeSlash} /> this is {post.isPrivate ? 'private post' : !post.published ? 'not published post' : ''}
                        </a>
                    )}
                    <a className="truncate font-bold text-xl" title={post.title ?? 'Loading'}>
                        {post.title ?? 'Loading'}
                    </a>
                    <a className="truncate text-sm">{author ? `by ${author.username}` : 'loading…'}</a>
                </div>
                {/* {post.content ? <p className="truncate fond-light text-sm">{post?.content ?? 'Loading'}</p> : null} */}
                {postContent ? (
                    <p className="truncate font-light text-sm" title="click to see content">
                        {postContent ?? 'Loading'}
                    </p>
                ) : null}
            </div>
        </Link>
    );
};

export default MiniPost;
