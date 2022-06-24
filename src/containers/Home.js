import React, { useEffect } from 'react';
import Editor from './../components/Editor';

export default function Home() {

  return (
    <div className="mt-4 w-full">
      <img src="https://github.com/nakala-lang/nakala/raw/main/assets/new_logo.png" className="max-w-xs mx-auto" />

      <div className="pt-4" />
      <Editor />
    </div>
  )
}
