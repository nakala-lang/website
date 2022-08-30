import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import Seo from "../components/seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Seo />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
