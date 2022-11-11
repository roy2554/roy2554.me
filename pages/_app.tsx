import '../styles/globals.css';
import '../components/Editor/styles.scss';
import '../components/Editor/CodeBlockComponent/styles.scss';
import type { AppProps } from 'next/app';

// FontAwesome Configs
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from 'next/head';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-dark-bg text-white">
            <Head>
                <title>roy2554</title>
                <meta name="title" content="roy2554" />
                <meta name="description" content="roy2554's profile page" />
            </Head>

            <meta name="keywords" content="roy2554, roy2554.me, devroy" />
            <meta name="author" content="roy2554" />

            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
