import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_temps } from "../../redux/actions";
import style from "../../stylesheets/CreateDog.module.css";
function Temps({ id }) {
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temps);
  useEffect(() => {
    dispatch(get_temps());
  }, [dispatch]);
  const name = temps.find((el) => el.id === id && el.name);
  return <p className={style.name_temperament}>{name.name}</p>;
}

export default Temps;
