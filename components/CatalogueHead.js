import Head from "next/head";
import metadata from "../catalogue/metadata";

const CatalogueHead = () => {
  return (
    <Head>
      <title>{metadata.name}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content={metadata.name} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={`${metadata.url}/image.png`} />
      <meta name="theme-color" content="#FFFFFF" />
    </Head>
  );
};

export default CatalogueHead;
