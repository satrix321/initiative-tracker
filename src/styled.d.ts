// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    spacings: {
      spacing1: string
      spacing2: string
      spacing3: string
      spacing4: string
      spacing5: string
      spacing6: string
      spacing7: string
      spacing8: string
      spacing9: string
      spacing10: string
      spacing11: string
      spacing12: string
      spacing13: string
      spacing14: string
      spacing15: string
      spacing16: string
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