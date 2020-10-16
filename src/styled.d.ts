// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    spacings: {
      p2: string
      p4: string
      p8: string
      p12: string
      p16: string
      p24: string
      p32: string
      p48: string
      p64: string
      p96: string
      p128: string
      p192: string
      p256: string
      p384: string
      p512: string
      p640: string
      p768: string
      p1024: string
      p1200: string
    }

    fonts: {
      text: string
      input: string
      mono: string
    }

    fontSizes: {
      verySmall: string
      small: string
      regular: string
      large: string
      veryLarge: string
    };
    
    fontWeights: {
      normal: string
      bold: string
    };

    colors: {
      lightIcon: string
      darkIcon: string

      primaryDark3: string
      primaryDark2: string
      primaryDark1: string
      primary: string
      primaryLight1: string
      primaryLight2: string
      primaryLight3: string

      secondaryDark3: string
      secondaryDark2: string
      secondaryDark1: string
      secondary: string
      secondaryLight1: string
      secondaryLight2: string
      secondaryLight3: string

      errorDark3: string
      errorDark2: string
      errorDark1: string
      error: string
      errorLight1: string
      errorLight2: string
      errorLight3: string

      greyDark5: string
      greyDark4: string
      greyDark3: string
      greyDark2: string
      greyDark1: string
      greyLight5: string
      greyLight4: string
      greyLight3: string
      greyLight2: string
      greyLight1: string
    }
  }
}