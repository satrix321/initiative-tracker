import { DefaultTheme } from 'styled-components';

export const Theme: DefaultTheme = {
  spacings: {
    p2: '0.125rem',
    p4: '0.25rem',
    p8: '0.5rem',
    p12: '0.75rem',
    p16: '1rem',
    p24: '1.5rem',
    p32: '2rem',
    p48: '3rem',
    p64: '4rem',
    p96: '6rem',
    p128: '8rem',
    p192: '12rem',
    p256: '16rem',
    p384: '24rem',
    p512: '32rem',
    p640: '40rem',
    p768: '48rem',
    p1024: '64rem',
    p1200: '75rem',
  },
  
  fonts: {
    text: '"Helvetica"',
    input: 'Tahoma',
    mono: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  
  fontSizes: {
    verySmall: '0.625rem',
    small: '0.75rem',
    regular: '0.875rem',
    large: '1rem',
    veryLarge: '1.125rem',
  },
  
  fontWeights: {
    normal: '400',
    bold: '600',
  },
  
  colors: {
    lightIcon: 'hsl(0, 0%, 100%)',
    darkIcon: 'hsl(0, 0%, 0%)',
  
    primaryDark3: 'hsl(270, 62%, 10%)',
    primaryDark2: 'hsl(270, 63%, 25%)',
    primaryDark1: 'hsl(270, 63%, 32%)',
    primary: 'hsl(270, 63%, 42%)',
    primaryLight1: 'hsl(270, 63%, 55%)',
    primaryLight2: 'hsl(270, 63%, 75%)',
    primaryLight3: 'hsl(270, 62%, 90%)',
  
    secondaryDark3: 'hsl(311, 71%, 10%)',
    secondaryDark2: 'hsl(311, 71%, 25%)',
    secondaryDark1: 'hsl(311, 71%, 32%)',
    secondary: 'hsl(311, 71%, 42%)',
    secondaryLight1: 'hsl(311, 71%, 55%)',
    secondaryLight2: 'hsl(311, 71%, 75%)',
    secondaryLight3: 'hsl(311, 71%, 90%)',
  
    errorDark3: 'hsl(0, 70%, 25%)',
    errorDark2: 'hsl(0, 67%, 33%)',
    errorDark1: 'hsl(0, 70%, 42%)',
    error: 'hsl(0, 70%, 50%)',
    errorLight1: 'hsl(0, 70%, 65%)',
    errorLight2: 'hsl(0, 79%, 80%)',
    errorLight3: 'hsl(0, 77%, 95%)',
  
    greyDark5: 'hsl(213, 12%, 15%)',
    greyDark4: 'hsl(210, 10%, 23%)',
    greyDark3: 'hsl(210, 9%, 31%)',
    greyDark2: 'hsl(210, 7%, 56%)',
    greyDark1: 'hsl(210, 11%, 71%)',
    greyLight1: 'hsl(210, 14%, 83%)',
    greyLight2: 'hsl(210, 14%, 89%)',
    greyLight3: 'hsl(210, 16%, 93%)',
    greyLight4: 'hsl(210, 17%, 95%)',
    greyLight5: 'hsl(210, 17%, 98%)',
  }
};