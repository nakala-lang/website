import React, { useContext, useEffect } from 'react';

export default function Home({ interpreter }) {

  useEffect(() => {
    console.log(interpreter("print(5+5);"));
  }, []);

  return (
    <div>
      Home Page
    </div>
  )
}
