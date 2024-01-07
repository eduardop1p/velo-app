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
        'primary-2': '#ffffffb3',
        secondary: '#1a1c1fff',
        black: '#000',
        blue: '#549cffff',
        bluehover: '#307ae0ff',
        'blue-graphic': '#7db4ffff',
        'blue-control-slider': '#b1d2ffff',
        'blue-control-slider-active': '#195ab4ff',
        'red-graphic': '#f76970ff',
        'gray-section': '#f6f6f6',
        'gray-section-2': '#f5f5f5ff',
        'black-section': '#101010ff',
        'black-section-2': '#1b1e20ff',
        'black-neutral': '#61686eff',
        'black-neutral-383b3eff': '#383b3eff',
        'gray-000000b3': '#000000b3',
        'gray-00000033': '#00000033',
        'gray-b8bec4ff': '#b8bec4ff',
        'rgba-0-0-0-1': 'rgba(0,0,0,.1)',
        'footer-black': '#101010ff',
        'footer-gray': '#373737ff',
        '3d3d3d': '#3d3d3d',
        ffffff33: '#ffffff33',
        ced4da: '#ced4da',
        '6c757d': '#6c757d',
        '495057': '#495057',
        e9ecef: '#e9ecef',
        '1d4ed8': '#1d4ed8',
        EFF6FF: '#EFF6FF',
        b1d2ffff: '#b1d2ffff',
        '69717f': '#69717f',
        '195ab4ff': '#195ab4ff',
        f217deff: '#f217deff',
        ffffff4d: '#ffffff4d',
        '191919': '#191919',
        '383b3eff': '#383b3eff',
        '272a2eff': '#272a2eff',
        '1b1e20ff': '#1b1e20ff',
        '0006': '#0006',
        '2e3238': '#2e3238',
        '959ca2ff': '#959ca2ff',
        '34383cff': '#34383cff',
        dee2e6: '#dee2e6',
        '3d2d66ff': '#3d2d66ff',
        '627eea': '#627eea',
        '8247e5': '#8247e5',
        ed3e43: '#ed3e43',
        ff0420: '#ff0420',
        '123570ff': '#123570ff',
        '12d2b0': '#12d2b0',
        '484848ff': '#484848ff',
        '0e613aff': '#0e613aff',
      },
      boxShadow: {
        'effect-1': '0 0 0 0.2rem #bfdbfe',
        'effect-2': '0 2px 12px #0000001a',
      },
      borderWidth: {
        '1': '1px',
      },
      keyframes: {
        sliderUp: {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        sliderUp: 'sliderUp 800ms ease-in-out 1',
      },
      height: {
        'full-screen-80px': 'calc(100vh - 80px)',
      },
      minHeight: {
        'full-screen-80px': 'calc(100vh - 80px)',
      },
    },
  },
  plugins: [],
};
export default config;
