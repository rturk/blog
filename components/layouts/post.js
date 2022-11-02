import React from "react";
import Page from "./main";
import Head from "next/head";
import Header from "../post/header";
import { Suspense } from "react";

const Post = ({ id, children, title, date, description, og }) => (
  <Page>
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Rafael Turk's blog" />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rafaturk" />
      <meta property="og:image" content={og} />
    </Head>
        <main>
          <article>
            <Header id={id} title={title} date={date} />
            <Suspense fallback={null}>{children}</Suspense>
          </article>
        </main>
    <style jsx>{`
      main {
        padding: 15px;
        font-size: 18px;
      }

      article {
        scroll-margin-top: 50px;
      }

      @media (min-width: 500px) {
        main {
          max-width: 42rem;
          margin: auto;
        }
      }
    `}</style>
  </Page>
);

export default Post;
