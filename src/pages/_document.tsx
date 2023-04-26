import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta name="description" content="Social Media Post" key="desc" />
      <meta property="og:title" content="SANSMedia" />
      <meta property="og:image" content="/favicon.ico" />
      <link rel="icon" href="/logo.png" />
      <body>
        <title>SANSMedia</title>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
