import { createGlobalStyle } from 'styled-components'

import { keiFont } from './localFonts'

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
  }

  :root {
    --kei-font: ${keiFont.style.fontFamily};
  }
`
