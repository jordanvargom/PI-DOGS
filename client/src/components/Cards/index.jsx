import React from "react";
import { Link, NavLink } from "react-router-dom";
import style from "../../stylesheets/Cards.module.css";

function Card({ name, temperament, weight, image}) {
 
  return (
    <div className={style.container}>
      <p className={style.title}>{name}</p>
      <div className={style.data}>
        <div className={style.image_container}>
          <img src={image} alt={name} className={style.image} />
        </div>
        <div className={style.datos}>
        <p className={style.weight}>Weight: {weight}</p>
        <p className={style.temps}>Temperament: {temperament}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
