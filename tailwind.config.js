/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./pages/**/*.{js,jsx,md,mdx,ts,tsx}', './components/**/*.{js,jsx,md,mdx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#22272E',
                'dark-bg-hover': '#292E36',
                'dark-bg-secondary': '#2C2F33',
                'dark-bg-secondary-hover': '#383B40',
                'dark-border': '#444C56',
                'dark-text': '#ADBAC6',
                'dark-text-hover': '#BAC6D1', //  #9FA8B4
                'warning-bg': '#FFC107',
                'warning-text': '#FFF',
                'warning-border': '#FFD54F',
                'success-bg': '#4CAF50',
                'success-text': '#FFF',
                'success-border': '#4CAF50',
                'danger-bg': '#F44336',
                'danger-text': '#FFF',
                'danger-border': '#FF5252',
            },
        },
    },
    variants: {
        extend: {
            display: ['group-hover'],
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
