import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useRef, useState } from 'react';
import Button from '../../components/MK2/Button';
import Div from '../../components/Layout/div/MainPage';
import Input from '../../components/MK2/Input';
import Editor from '../../components/MK2/Editor/nouse';

const Components: NextPage = () => {
    const router = useRouter();

    const quill = useRef(null);

    console.log(quill);

    return (
        <div>
            <Head>
                <title>roy2554</title>
                <meta name="title" content="roy2554" />
                <meta name="description" content="roy2554's profile page" />
            </Head>

            <div className="h-screen flex items-center justify-center text-center text-dark-text flex-col">
                <div className="Buttons flex flex-col flex-wrap">
                    <div className="ActivatedButtons flex flex-row flex-wrap">
                        <Button color="primary">primary</Button>
                        <Button color="secondary">secondary</Button>
                        <Button color="danger">danger</Button>
                        <Button color="success">success</Button>
                        <Button color="warning">warning</Button>
                    </div>
                    <div className="DisabledButtons flex flex-row flex-wrap">
                        <Button
                            color="primary"
                            disabled
                            onClick={() => {
                                console.log('CLICKED');
                            }}
                        >
                            primary
                        </Button>
                        <Button color="secondary" disabled>
                            secondary
                        </Button>
                        <Button color="danger" disabled>
                            danger
                        </Button>
                        <Button color="success" disabled>
                            success
                        </Button>
                        <Button color="warning" disabled>
                            warning
                        </Button>
                    </div>
                </div>
            </div>
            <Editor
                className="w-full"
                defaultValue="sea"
                ref={quill}
                onChange={(content: string) => {
                    console.log(content);
                }}
            />
        </div>
    );
};

export default Components;
