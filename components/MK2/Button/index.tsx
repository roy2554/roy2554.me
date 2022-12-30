import React from 'react';
import tw from 'tailwind-styled-components';

interface buttonProps {
    color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'transparent';
}

const Button = tw.button<buttonProps>`
    appearance-none border-none cursor-pointer focus:outline-none
    text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
    duration-300

    ${(props) => props.disabled && 'cursor-not-allowed brightness-50 hover:none'}

    ${(props) => props.color === 'primary' && 'bg-primary-bg dark:bg-primary-dark-bg enabled:hover:bg-primary-bg-hover enabled:dark:hover:bg-primary-dark-bg-hover'};
    ${(props) => props.color === 'secondary' && 'bg-secondary-bg dark:bg-secondary-dark-bg enabled:hover:bg-secondary-bg-hover enabled:dark:hover:bg-secondary-dark-bg-hover'};
    ${(props) => props.color === 'danger' && 'bg-danger-bg dark:bg-danger-dark-bg enabled:hover:bg-danger-bg-hover enabled:dark:hover:bg-danger-dark-bg-hover'};
    ${(props) => props.color === 'success' && 'bg-success-bg dark:bg-success-dark-bg enabled:hover:bg-success-bg-hover enabled:dark:hover:bg-success-dark-bg-hover'};
    ${(props) => props.color === 'warning' && 'bg-warning-bg dark:bg-warning-dark-bg enabled:hover:bg-warning-bg-hover enabled:dark:hover:bg-warning-dark-bg-hover'};
    ${(props) => props.color === 'transparent' && 'bg-transparent dark:bg-transparent enabled:hover:bg-transparent enabled:dark:hover:bg-transparent'};
`;
export default Button;
