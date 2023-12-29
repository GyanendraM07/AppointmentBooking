import React from "react";
import { useEffect } from "react";

const Demo = () => {
  useEffect(() => {
    console.log("checkkkkkkkkkkkkkkk");
}, []);
  return (
    <div>
    <h1>Welcome to MyComponent!</h1>
    <p>This is a simple React component  Demo.</p>
  </div>
  );
};

export default Demo;
