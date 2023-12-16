import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'velo-img-4': "url('/assets/imgs/velo-img-4.png')",
      },
      colors: {
        primary: '#fff',
        secondary: '#1a1c1fff',
        black: '#000',
        blue: '#549cffff',
        bluehover: '#307ae0ff',
        'blue-graphic': '#7db4ffff',
        'blue-control-slider': '#b1d2ffff',
        'blue-control-slider-active': '#195ab4ff',
        'red-graphic': '#f76970ff',
        'gray-section': '#f6f6f6',
        'black-section': '#101010ff',
        'gray-000000b3': '#000000b3',
        'gray-00000033': '#00000033',
        'rgba-0-0-0-1': 'rgba(0,0,0,.1)',
      },
      borderWidth: {
        '1': '1px',
      },
    },
  },
  plugins: [],
};
export default config;
