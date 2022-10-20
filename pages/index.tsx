import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Home: NextPage = () => {
    const router = useRouter();

    return (
        <div>
            <div className="h-screen flex items-center justify-center text-center text-dark-text flex-col">
                <div className="alert">
                    <div className="bg-dark-bg-secondary w-full p-4 rounded-md mb-8">
                        want to visit my legacy page?{' '}
                        <Link href="/legacy">
                            <a className="underline hover:cursor-pointer">click here</a>
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <p className="text-3xl font-extrabold">roy2554</p>
                    </div>
                    <div className="justify-center flex flex-row">
                        <a className="text-xl hover:text-dark-text-hover" href={'https://github.com/roy2554'} target={'_blank'} rel={'noreferrer'}>
                            {/* <FontAwesomeIcon icon={['fab', 'github']} /> */}
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </div>
                </div>
                <div className="p-4" />
                <div className="justify-center flex flex-col sm:flex-row space-x-0 sm:space-x-16 space-y-4 sm:space-y-0">
                    <div className="techstacks">
                        <p className="font-bold text-lg">Technology stacks</p>
                        <div className="font-normal text-small">
                            <p>React</p>
                            <p>Next.js</p>
                            <p>Express</p>
                        </div>
                    </div>
                    <div className="experiences">
                        <p className="font-bold text-lg">Experiences</p>
                        <div className="font-normal text-small">
                            <p>build a home server</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
