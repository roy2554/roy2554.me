import React from 'react';
import tw from 'tailwind-styled-components';
import { TemplateFunction } from 'tailwind-styled-components/dist/tailwind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

interface StateProps {
    color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

const StateNotice = tw.div<StateProps>`
    appearance-none border-none focus:outline-none
    text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2

    ${(props) => props.color === 'primary' && 'bg-primary-bg dark:bg-primary-dark-bg'};
    ${(props) => props.color === 'secondary' && 'bg-secondary-bg dark:bg-secondary-dark-bg'};
    ${(props) => props.color === 'danger' && 'bg-danger-bg dark:bg-danger-dark-bg'};
    ${(props) => props.color === 'success' && 'bg-success-bg dark:bg-success-dark-bg'};
    ${(props) => props.color === 'warning' && 'bg-warning-bg dark:bg-warning-dark-bg'};
`;

interface Props {
    state?: string | null;
    setState?: (state: string | null) => void;
    canClose?: boolean;
}

const SN = (props: TemplateFunction<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> & StateProps & Props) => {
    // @ts-ignore
    return (
        <div className={props.state !== null ? 'block' : 'hidden'}>
            {/* @ts-ignore */}
            <StateNotice {...props}>
                <div className="flex justify-between">
                    {/* @ts-ignore */}
                    <div>{props.children}</div>
                    <div className={props.canClose !== false ? 'block' : 'hidden'}>
                        <Button
                            color="transparent"
                            className="p-0 m-0 opacity-25 hover:opacity-100"
                            onClick={() => {
                                if (props.setState) props.setState(null);
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </Button>
                    </div>
                </div>
            </StateNotice>
        </div>
    );
};

export default SN;
