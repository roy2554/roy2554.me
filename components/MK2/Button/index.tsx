import React from 'react';
import tw from 'tailwind-styled-components';

const Button = tw.button`
    appearance-none cursor-pointer border-none focus:outline-none
    text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2

    ${(props) => (props.color === 'primary' || !props.color) && 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700'}
    ${(props) => props.color === 'secondary' && 'bg-gray-500 hover:bg-gray-700'}
    ${(props) => props.color === 'danger' && 'bg-red-500 hover:bg-red-700'}
    ${(props) => props.color === 'success' && 'bg-green-500 hover:bg-green-700'}
    ${(props) => props.color === 'warning' && 'bg-yellow-500 hover:bg-yellow-700'}
`;

export default Button;
