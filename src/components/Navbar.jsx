import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="relative  w-full  bg-neutral-100 py-2  shadow-lg  ">
      <div className="flex w-2/5 flex-wrap justify-between  px-5">
        <Link
          to="/"
          className="text-xl text-neutral-600 hover:text-neutral-900"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="text-xl text-neutral-600 hover:text-neutral-900 "
        >
          Login
        </Link>
        <br />
      </div>
    </div>
  );
}

export default Navbar;
