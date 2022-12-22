import React from 'react';
import tw from 'tailwind-styled-components';

const Input = tw.input`
    appearance-none border-none cursor-pointer focus:outline-none
    text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2

    ${(props) => props.disabled && 'cursor-not-allowed brightness-50 hover:none'}

    bg-dark-bg-secondary enabled:hover:bg-dark-secondary-hover
`;

export default Input;
