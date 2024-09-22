import { Html, Head, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router'

export default function Document() {
  return (
    <Html lang="en" className="h-full">
      <Head>
        {/* Not sure if there's a better way to set base path */}
        <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.BASE_PATH}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.BASE_PATH}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.BASE_PATH}/favicon-16x16.png`} />
        <link rel="manifest" href={`${process.env.BASE_PATH}/site.webmanifest`} />
        <link rel="mask-icon" href={`${process.env.BASE_PATH}/safari-pinned-tab.svg`} color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
