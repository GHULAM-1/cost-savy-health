import localFont from 'next/font/local';

export const tiempos = localFont({
  src: [
    {
      path: '../../public/fonts/Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-tiempos',
  display: 'swap',
}); 