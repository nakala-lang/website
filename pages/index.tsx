import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Nakala</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-3/4">
        <Header
          home
          title="nakala"
          desc="A hobby programming language designed to be fun and familiar - because programming is meant to be fun!"
        />
      </section>

      <article className="prose mt-4">
        <h3 className="font-righteous text-3xl">Features</h3>
        <ul>
          <li>First class functions</li>
          <li>First class classes</li>
          <li>Static type checking</li>
          <li>High performance interpreter (written in Rust 🦀)</li>
          <li>Full-featured javascript interpeter via WASM (try the Playground!)</li>
          <li>Pretty error messages</li>
        </ul>
        <h3 className="font-righteous -mt-1 text-3xl">Planned Features</h3>
        <ul>
          <li>Multi-file support via Modules</li>
          <li>FFI support</li>
          <li>Compiler (probably to C++)</li>
        </ul>
      </article>
    </div>
  );
};

export default Home;