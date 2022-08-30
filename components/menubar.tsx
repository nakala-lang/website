import Link from "next/link";
import React, { useState } from "react";

const routes = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/playground",
    title: "Playground",
  },
];

export default function MenuBar() {
  return (
    <div className="w-full flex gap-4 font-righteous">
      <div className="grow" />
      <Link href="/">
        <p className="hover:underline hover:cursor-pointer">home</p>
      </Link>
      <Link href="/playground">
        <p className="hover:underline hover:cursor-pointer">playground</p>
      </Link>
      <a target="_blank" href="https://github.com/nakala-lang">
        <p className="hover:underline hover:cursor-pointer">contribute</p>
      </a>
    </div>
  );
}
