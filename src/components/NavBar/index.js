import React from 'react';

function NavBarItem({ name, link, isBold = false, isFirst = false }) {

  const handleClick = (link) => {
    if (link.startsWith("https://")) {
      window.open(link, '_blank')
    } else {
      window.location = link;
    }
  }

  return (
    <span onClick={() => handleClick(link)} className={`${isBold ? 'font-bold' : ''} ${isFirst ? '' : 'px-2'} hover:underline hover:cursor-pointer`}>{name}</span>
  );
}

export default function NavBar() {
  const links = [
    { name: ".nak", isBold: true, isFirst: true, link: "/" },
    { name: "docs", link: "/docs" },
    { name: "about", link: "/about" },
    { name: "github", link: "https://github.com/nakala-lang" }
  ];

  return (
    <div className="w-screen">
      <div className="max-w-lg flex mx-auto pt-2 text-lg">
        {links.map((item) => <NavBarItem {...item} />)}
      </div>
    </div>
  )
}
