import '../styles/globals.css'
import React from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'
import Script from 'next/script'
function MyApp({ Component, pageProps }) {
  
  
  return (
  <>
    
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></Script>
      <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>
    
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
