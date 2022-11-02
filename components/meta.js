import Head from "next/head";
import Router from "next/router";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Meta = () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    {/* global styles */}
    <style jsx global>{`
      * {
        margin: 0;
        box-sizing: border-box;
      }

      body {
        font: 13px Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
          serif;
      }

      a {
        color: #22bad9;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }

      @media (any-hover: hover) {
        a:hover {
          color: #fff;
          background: #22bad9;
          text-decoration: none;
        }
      }
    `}</style>
  </div>
);

export default Meta;
