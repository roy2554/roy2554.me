/** @type {import('tailwindcss').Config} */

function generateGridColumns(lastValue) {
    let obj = {};
    for (let i = 13; i < lastValue; i++) {
        obj[`${i}`] = `repeat(${i}, minmax(0, 1fr))`;
    }
    return obj;
}

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
                'dark-text-hover': '#BAC6D1',
                //  #9FA8B4
                // 'warning-bg': '#FFC107',
                // 'warning-text': '#FFF',
                // 'warning-border': '#FFD54F',
                // 'success-bg': '#4CAF50',
                // 'success-text': '#FFF',
                // 'success-border': '#4CAF50',
                // 'danger-bg': '#F44336',
                // 'danger-text': '#FFF',
                // 'danger-border': '#FF5252',

                'primary-bg': '#3b82f6',
                'primary-bg-hover': '#1d4ed8',
                'primary-dark-bg': '#1d4ed8',
                'primary-dark-bg-hover': '#1e40af',

                'secondary-bg': '#6b7280',
                'secondary-bg-hover': '#374151',
                'secondary-dark-bg': '#6b7280',
                'secondary-dark-bg-hover': '#374151',

                'danger-bg': '#ef4444',
                'danger-bg-hover': '#b91c1c',
                'danger-dark-bg': '#dc2626',
                'danger-dark-bg-hover': '#991b1b',

                'success-bg': '#22c55e',
                'success-bg-hover': '#15803d',
                'success-dark-bg': '#16a34a',
                'success-dark-bg-hover': '#166534',

                'warning-bg': '#eab308',
                'warning-bg-hover': '#a16207',
                'warning-dark-bg': '#ca8a04',
                'warning-dark-bg-hover': '#854d0e',
            },
            gridTemplateColumns: {
                ...generateGridColumns(100), // This generates the columns from 12 until 100
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
