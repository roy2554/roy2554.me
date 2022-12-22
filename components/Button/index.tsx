import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Head from 'next/head';

import axios from 'axios';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Post } from '../../types/database';

interface Props {
    title: string;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'danger' | 'success';
    onClick?: () => void;
}

const ButtonComponent = ({ title, disabled = false, color = 'primary', onClick }: Props) => {
    const ButtonColors = {
        primary: 'bg-blue-500 focus:ring-blue-600',
        secondary: 'bg-gray-500 focus:ring-gray-600',
        danger: 'bg-red-500 focus:ring-red-600',
        success: 'bg-green-500 focus:ring-green-600',
    };

    const ButtonClass = `${ButtonColors[color]} text-white font-bold py-2 px-4 rounded outline-none border border-transparent focus:outline-none focus:ring-2 focus:ring-opacity-50`;

    return (
        <div>
            <button onClick={onClick} className={ButtonClass} disabled={disabled}>
                {title}
            </button>
        </div>
    );
};

export default ButtonComponent;
