import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initalProps = await Document.getInitialProps(ctx);
    return initalProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
          <meta property="og:url" content="" key="ogurl" />
          <meta property="og:image" content="/public/home/logo2.png" key="ogimage" />
          <meta property="og:title" content="FindingPets" key="ogtitle" />
          <meta property="og:description" content="FindingPets una pagina para encontrar mascotas perdidas" key="ogdesc" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
