import React from "react";
import { Link } from "react-router-dom";


export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            MovieKnight
          </div>

          <ul className="nav-links">
            <li>
            <Link to="/watchlist">  Watch List</Link>
            </li>

            <li>
            <Link to="/watchparties">  Watch Parites</Link>
            </li>

            <li className="btn btn-main">
           
            <Link to="/newparty">New Party</Link>
             
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};