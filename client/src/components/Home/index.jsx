import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_dogs, get_temps } from "../../redux/actions";
import Card from "../Cards";
import Paginacion from "../Paginacion";
import style from "../../stylesheets/Home.module.css";
import { Link } from "react-router-dom";
import { filtereDogs, maximo } from './controllers.js'

function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.dogs);
  const temps = useSelector((state) => state.temps);

  useEffect(() => {
    dispatch(get_dogs());
    dispatch(get_temps());
  }, [dispatch]);

  let dogs = state;
  const [pagina, setPagina] = useState(1);
  const [cantidad, setCantidad] = useState(8);
  let max = maximo;

  const [buscador, setBuscador] = useState("");
  const [filtro, setFitro] = useState("");
  const [temp, setTemp] = useState("");

  const handleSelect = (e) => {
    setFitro(e.target.value);
  };
  const tempSelect = (e) => {
    setTemp(e.target.value);
    setPagina(1);
  };
  const handleChange = (e) => {
    setBuscador(e.target.value);
    setPagina(1);
  };
  const render = filtereDogs(dogs, buscador, cantidad, filtro, temp)
  return (
    <div className={style.container}>
      {state.length ? (
        <>
          <h1 className={style.title}>Henry PI Dogs Jorge Daniel</h1>
          <div className={style.filtro}>
            <div className={style.item}>
              <section>
                <p>Search breed: </p>
                <input className={style.input} type="text" onChange={handleChange} placeholder='Name...' />
              </section>
            </div>
            <div className={style.item}>
              <section>
                <select onChange={handleSelect}>
                  <option disabled selected defaultValue>
                    Order by
                  </option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                  <option value="Weight-Min">Weight-Min</option>
                  <option value="Weight-Max">Weight-Max</option>
                </select>
              </section>
            </div>
            <div className={style.item}>
              <section>
                <select name="temperament" onChange={tempSelect}>
                  <option disabled selected defaultValue>
                    Filter by Temperament
                  </option>
                  <option defaultValue>Todos</option>
                  {temps?.map((el) => (
                    <option value={el.name} key={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </section>
            </div>
          </div>
          {!render.length ? (
            <div className={style.container}>
              <h1>We have not found the breed</h1>
            </div>
          ) : (
            <div className={style.main_container}>
              <div className={style.container_cards}>
                {render
                  .slice(
                    (pagina - 1) * cantidad,
                    (pagina - 1) * cantidad + cantidad
                  )
                  .map((dog) => (
                    <div className={style.container_card} key={dog.id}>
                      <Link to={`/dogs/dog${dog.id}`}>
                        <Card
                          key={dog.id}
                          id={dog.id}
                          name={dog.name}
                          temperament={dog.temperament}
                          weight={
                            typeof dog.weight === "string"
                              ? dog.weight
                              : dog.weight.metric
                          }
                          image={
                            typeof dog.image === "string"
                              ? dog.image
                              : dog.image.url
                          }
                        />
                      </Link>
                    </div>
                  ))}
              </div>

              {state.length ? (
                <Paginacion pagina={pagina} setPagina={setPagina} maximo={max} />
              ) : null}
            </div>
          )}
        </>
      ) : (
        <div className={style.loadingContainer}>
          <div className={style.ldsfacebook}><div></div><div></div><div></div></div>


        </div>
      )}
    </div>
  );
}

export default Home;
