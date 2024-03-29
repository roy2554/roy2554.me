/** @type {import('next').NextConfig} */

const Dotenv = require('dotenv-webpack');

const nextConfig = {
    webpack: (config) => {
        config.plugins.push(new Dotenv({ silent: true }));
        return config;
    },
    // reactStrictMode: true,
    reactStrictMode: false,
    swcMinify: true,
    async rewrites() {
        if (process.env.NODE_ENV !== 'production') {
            return [
                {
                    source: process.env.SOURCE_PATH,
                    destination: process.env.DESTINATION_URL,
                },
            ];
        } else {
            return [
                {
                    source: process.env.SOURCE_PATH,
                    destination: process.env.DESTINATION_URL,
                },
            ];
        }
    },
};

module.exports = nextConfig;
