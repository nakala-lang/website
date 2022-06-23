import React, { useContext, useEffect } from 'react';

export default function Home({ interpreter }) {

  useEffect(() => {
    console.log(interpreter("print(5+5);"));
  }, []);

  return (
    <div className="px-10">
      Home Page
    </div>
  )
}
