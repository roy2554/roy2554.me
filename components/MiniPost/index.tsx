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

    // const parser = new DOMParser();
    // const html = parser.parseFromString(post.content || '<a>no contents</a>', 'text/html');
    // console.log(html.textContent);
    const postContent = parseHTML(post.content || '');

    return (
        <div
            className={`${
                post ? null : 'animate-pulse'
            } text-dark-text p-2 bg-dark-bg-secondary rounded-md max-w-xs w-full hover:cursor-pointer hover:bg-dark-bg-secondary-hover duration-200 px-4`}
        >
            <p className="truncate font-bold text-lg" title={post.title ?? 'Loading'}>
                {post.id} {post.title ?? 'Loading'}
            </p>
            {/* {post.content ? <p className="truncate fond-light text-sm">{post?.content ?? 'Loading'}</p> : null} */}
            {postContent ? (
                <p className="truncate fond-light text-sm" title="click to see content">
                    {postContent ?? 'Loading'}
                </p>
            ) : null}
        </div>
    );
};

export default MiniPost;
