import Head from 'next/head';
import React from 'react';

export default function Seo() {
  return (
    <Head>
      <title>Nakala</title>
      <meta name="description" content="A programming language designed to be familiar and fun, written in Rust. Try it yourself in the online playground!" />

      <meta property="og:url" content="https://nakala-lang.github.io/website" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Nakala" />
      <meta property="og:description" content="A programming language designed to be familiar and fun, written in Rust. Try it yourself in the online playground!" />
      <meta property="og:image" content="https://github.com/nakala-lang/nakala/raw/main/assets/new_logo.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="nakala-lang.github.io" />
      <meta property="twitter:url" content="https://nakala-lang.github.io/website" />
      <meta name="twitter:title" content="Nakala" />
      <meta name="twitter:description" content="A programming language designed to be familiar and fun, written in Rust. Try it yourself in the online playground!" />
      <meta name="twitter:image" content="https://github.com/nakala-lang/nakala/raw/main/assets/new_logo.png" />
    </Head>
  )
}
