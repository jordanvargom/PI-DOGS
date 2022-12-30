import React from "react";
import { Link } from "react-router-dom";
import style from "../../stylesheets/NavBar.module.css";
function NavBar() {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <p >NavBar</p>
      </div>
      <div className={style.item}>
        <Link to="/dogs/createdog">
          <p>CreateDogs</p>
        </Link>
      </div>
      <div className={style.item}>
        <Link to="/dogs">
          <p>Home</p>
        </Link>
      </div>
      <div className={style.item}>
        <Link to="/">
          <p>MainPage</p>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
