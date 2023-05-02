import { GlobalStyle } from '@/styles/globalStyle'
import type { AppProps } from 'next/app'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <GlobalStyle />
      <Component {...pageProps} />
    </React.StrictMode>
  )
}
