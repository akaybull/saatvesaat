import React from "react";
import getLocalStorage from "../helpers/getLocalStorage";
import { Link } from "react-router-dom";

const Header = () => {
  const userName = getLocalStorage("userName");
  const userAvatar = getLocalStorage("userAvatar");

  return (
    <header className="w-full flex items-center justify-between pl-16 p-4 bg-slate-500">
      <nav className="flex gap-4">
        <Link to="/kanban" className="hover:text-white">
          Kanban
        </Link>
        <Link to="/about" className="hover:text-white">
          Hakkımızda
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <img className="rounded-full h-10" alt="userAvatar" src={userAvatar} />
        <span className="text-white text-xl flex justify-end">{userName}</span>
      </div>
    </header>
  );
};

export default Header;
