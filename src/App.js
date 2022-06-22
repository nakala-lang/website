import React, { useState, useEffect } from 'react';
import Home from './containers/Home';

export function App() {

  const interpret = async (input) => {
    try {
      let js = await import("@nakala-lang/nakjs");
      let res = js.wasm_interpret(input);
      return res;
    } catch (err) {
      window.alert("Failed to import interpreter");
      console.error(err);
    }
  }

  return (
    <div>
      <Home interpreter={interpret}/>
    </div>
  );
}
