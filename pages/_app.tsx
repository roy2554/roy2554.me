import '../styles/globals.css';
import '../components/Editor/styles.scss';
import '../components/Editor/CodeBlockComponent/styles.scss';
import type { AppContext, AppProps } from 'next/app';

// FontAwesome Configs
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from 'next/head';
config.autoAddCss = false;

// cookie
import cookies from 'next-cookies';
import { setToken } from '../Utils/tokenManager';
import App from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import cookie from 'react-cookies';
import Footer from '../components/Footer';
import useStore from '../store';
import axios from 'axios';
import { getCookie, getCookies } from 'cookies-next';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    // useEffect(() => {
    //     const jwt = cookies();

    // })

    const [queryClient] = useState(() => new QueryClient());

    const { setUserInfo } = useStore();

    const [isMotdPrinted, setIsMotdPrinted] = useState<boolean>(false);

    useEffect(() => {
        if (!isMotdPrinted) {
            setIsMotdPrinted(true);
            console.log(`┌────────────────────────────────────────────────────────────┐`);
            console.log(`│ (C)${new Date().getFullYear()} ROY2554.ME                                         │`);
            console.log(`│ PROVIDED BY ROY2554 (roy2554code@gmail.com)                │`);
            console.log(`│ PLEASE CONTACT ME IF YOU HAVE ISSUE WITH USING MY WEB PAGE │`);
            console.log(`└────────────────────────────────────────────────────────────┘`);
        }
    }, [isMotdPrinted]);

    useEffect(() => {
        const asyncFunc = async () => {
            const allCookies = getCookies();
            // console.log('ALL COOKIES:::', allCookies);

            // let token = await cookie.load('jsonwebtoken');
            let token = getCookie('__Secure-HI001');
            // console.log('TOKEN:::', token);

            // console.log('RELOADED ');

            if (token) {
                setToken(token as string);

                const res = await axios.get('/api/auth/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // const credentialsInfo = await axios.get('http://localhost:5100/auth/whoami');
                // console.log(credentialsInfo);

                // console.log('RES:::', res);

                if (res.data) {
                    delete res.data.isAuthorized;
                    setUserInfo(res.data);
                }
            }
        };
        asyncFunc();
    }, [router]);

    return (
        <div className="dark min-h-screen bg-dark-bg text-white">
            <Head>
                <title>roy2554</title>
                <meta name="title" content="roy2554" />
                <meta name="description" content="roy2554's profile page" />
            </Head>

            <meta name="keywords" content="roy2554, roy2554.me, devroy" />
            <meta name="author" content="roy2554" />

            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <footer>
                    <Footer />
                </footer>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
    // key의 값을 출력하는 함수를 만듬.
    function getCookie(key: any) {
        let result = null;
        // cookie log를 찍어보면 ;로 구분해서 string 값으로 들어오기 때문에 split으로 나눈다.
        let cookie = ctx?.ctx?.req?.headers?.cookie?.split(';');
        cookie?.some(function (item: any) {
            // 공백을 제거
            item = item.replace(' ', '');

            let dic = item.split('=');

            if (key === dic[0]) {
                result = dic[1];
                return true; // break;
            }
        });
        return result;
    }
    const token = getCookie('__Secure-HI001');

    if (token) {
        setToken(token);
    }
    return {};
};

// MyApp.getInitialProps = async (appContext: AppContext) => {
//     // const appProps = await MyApp.getInitialProps(appContext);
//     const { ctx } = appContext;
//     const allCookies = cookies(ctx);
//     const token = allCookies['jsonwebtoken'];

//     console.log('im working');

//     if (token) {
//         console.log('token set', token);
//         setToken(token);
//     }

//     // return { ...appProps };
//     // return { ...appProps };
//     console.log('SDADASDASDAD');
//     return 'fuck you';
// };

export default MyApp;
