import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import Head from 'next/head';
import ModalComponent from '../components/Modal';
import { useState } from 'react';
import Button from '../components/MK2/Button';
import useStore from '../store';
import { User } from '../types/database';
import Image from 'next/image';

const Home: NextPage = () => {
    const router = useRouter();

    const [media, setMedia] = useState<string[]>([]);

    const { userInfo }: { userInfo: User | null } = useStore();

    return (
        <div>
            <Head>
                <title>roy2554</title>
                <meta name="title" content="roy2554" />
                <meta name="description" content="roy2554's profile page" />
            </Head>

            <div className="flex flex-col">
                <div className="flex flex-col h-screen justify-center items-center">
                    <div className="flex items-start justify-between">
                        <div className="p-4 md:p-16 flex flex-col space-y-2">
                            <a className="text-3xl md:text-6xl font-extrabold">roy2554</a>
                            <a className="">A student developer</a>
                        </div>
                        <div className="p-8 md:p-20">
                            <Link href="https://github.com/roy2554">
                                <a title="visit my github profile">
                                    <FontAwesomeIcon
                                        icon={faCircleRight}
                                        // title="visit my github profile"
                                        className="text-3xl md:text-6xl cursor-pointer hover:text-primary-bg duration-100"
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center h-screen">
                    <a className="text-lg md:text-2xl font-bold">🎉 A new service has been open!</a>
                    <Image src="/roybloglogo.svg" alt="roy2554 blog logo" width={200} height={150} />
                    <Button
                        color="primary"
                        onClick={() => {
                            router.push('/blog');
                        }}
                    >
                        Visit roy2554 blog
                    </Button>
                </div>
                {/* <div className="p-4"></div> */}
            </div>
            {/* <p>{media}</p>
            <p>{JSON.stringify(userInfo)}</p> */}
            {/* <ModalComponent
                title="wop, I'm modalwop, I'm modalwop, I'm modalwop, I'm modalwop, I'm modalwop, I'm modalwop, I'm modalwop, I'm modal"
                mode="mediaUpload"
                setMedia={setMedia}
                content="If You Agree for this, you should argee with this agenda"
                canBreakOut={true}
                actionOnYes={() => {
                    console.log('YES');
                }}
                actionOnNo={() => {
                    console.log('NO');
                }}
            /> */}
        </div>
    );
};

export default Home;
