import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/assets/icons/campusConnect_logo.png" />
        <link rel="apple-touch-icon" href="/assets/icons/campusConnect_logo.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
