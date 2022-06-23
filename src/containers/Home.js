import React, { useContext, useEffect } from 'react';

export default function Home({ interpreter }) {

  useEffect(() => {
    console.log(interpreter("print(5+5);"));
  }, []);

  return (
    <div className="mt-12">
      <img src="https://github.com/nakala-lang/nakala/raw/main/assets/new_logo.png" className="max-w-xs" />
      <div className="pt-8" />
      
      <h1 className="text-3xl">Nakala</h1>
    </div>
  )
}
