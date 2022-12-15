import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { Fragment } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}
