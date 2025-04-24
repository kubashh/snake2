import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="globe.svg" />
      </Head>
      <body className="bg-zinc-950 text-zinc-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
