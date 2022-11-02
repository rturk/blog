export const config = { runtime: "experimental-edge" };
import links from "@/links.json";
import Head from "next/head";

export function getServerSideProps(ctx) {
  const link = links[ctx.params.link];
  return {
    props: link,
  };
}

export default function LinkPage({ title, image, description }) {
  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Rafael Turk" />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rafaturk" />
      <meta property="og:image" content={`https://rafaelturk.com/og/${image}`} />
    </Head>
  );
}