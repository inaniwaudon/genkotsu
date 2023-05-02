import localFont from 'next/font/local'
import { createGlobalStyle } from 'styled-components'

export const keiFont = localFont({
  src: '../pages/keifont.ttf',
  variable: '--keifont',
  display: 'swap',
})

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: ${keiFont.style.fontFamily};
  }
`
