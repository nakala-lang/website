import React from 'react';

interface HeaderProps {
  home?: boolean;
  title: string;
  desc: string | React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ home = false, title, desc }) => {
  return (
    <div>
      <p className={`font-righteous ${home ? 'text-8xl' : 'text-6xl'}`}>{title}</p>
      <p className="mt-4 w-3/4 text-lg">{desc}
      </p>
    </div>
  )
}

export default Header;
