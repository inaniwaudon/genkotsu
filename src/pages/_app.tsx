import React from 'react'

import { GlobalStyle } from '@/styles/globalStyle'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <GlobalStyle />
      <Component {...pageProps} />
    </React.StrictMode>
  )
}
