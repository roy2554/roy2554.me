import '../styles/globals.css';
import type { AppProps } from 'next/app';

// FontAwesome Configs
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-dark-bg">
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
