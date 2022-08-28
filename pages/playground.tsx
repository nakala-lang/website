import { NextPage } from "next";
import React from "react";
import Editor from "../components/editor";
import Header from "../components/header";

const Playground: NextPage = () => {
  return (
    <>
      <Header
        title="Playground"
        desc={
          <>
            Try out the{" "}
            <b>full featured nakala interpreter right in your browser! </b>
            Write your own code, or click on one of the examples below.
          </>
        }
      />
      <div className="mt-8 h-1 bg-transparent" />

      <Editor />
    </>
  );
};

export default Playground;
