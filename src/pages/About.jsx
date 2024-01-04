import React, { useEffect } from "react";
import Header from "../components/Header";

const About = () => {
  const loremIpsum = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `;
  useEffect(() => {
    document.title = "Hakkımızda";
  }, []);
  return (
    <div className="w-full h-full bg-[#eef6fa]">
      <Header />
      <div className="p-16">
        <h1>About</h1>
        <p>{loremIpsum}</p>
      </div>
    </div>
  );
};

export default About;
