import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function NavBarItem({ name, link, isFirst = false, external = false }) {
  const isActive = useRouteMatch({
    path: link,
    exact: true,
  });

  return (
    <span
      className={`${isFirst ? '' : 'px-2'} hover:underline ${isActive ? 'font-bold' : ''}`}
      onClick={() => {
        if (external) window.open(link, "_blank");
      }}
    >
      <Link to={link}>{name}</Link>
    </span>
  );
}

export default function NavBar() {
  const links = [
    { name: ".nak ", link: "/website", isFirst: true },
    { name: "docs", link: "/website/docs" },
    { name: "about", link: "/website/about" },
    { name: "github", link: "https://github.com/nakala-lang", external: true },
  ];

  return (
    <div className="w-screen">
      <div className="max-w-2xl flex mx-auto pt-2 text-lg">
        {links.map((item) => (
          <NavBarItem {...item} />
        ))}
      </div>
    </div>
  );
}
