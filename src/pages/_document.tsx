import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC42FhSdCWc5TAjOoP3XOVqlWSEPAVdtwk&libraries=places&language=en"
          async
          defer
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
