import Link from 'next/link';
import React from 'react';

const routes = [{
  url: "/",
  title: "Home"
},
{
  url: "/playground",
  title: "Playground"
}]

export default function MenuBar() {
  return (
    <div className="w-full flex gap-4 font-righteous underline">
      <div className="grow" />
      <Link className="font-bold" href="/">Home</Link>
      <Link href="/playground">Playground</Link>
    </div>
  )
}
