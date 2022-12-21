import React from 'react';
import tw from 'tailwind-styled-components';

interface buttonProps {
    color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

const Button = tw.button<buttonProps>`
    appearance-none border-none cursor-pointer focus:outline-none
    text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
    duration-300

    ${(props) => props.disabled && 'cursor-not-allowed brightness-50 hover:none'}

    ${(props) =>
        (props.color === 'primary' || props.color === 'secondary' || props.color === 'danger' || props.color === 'success' || props.color === 'warning') &&
        `bg-${props.color}-bg dark:bg-${props.color}-dark-bg enabled:hover:bg-${props.color}-bg-hover enabled:dark:hover:bg-${props.color}-dark-bg-hover`}
`;

export default Button;
