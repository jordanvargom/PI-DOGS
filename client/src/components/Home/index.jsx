import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_dogs, get_temps } from "../../redux/actions";
import Card from "../Cards";
import Paginacion from "../Paginacion";
import style from "../../stylesheets/Home.module.css";
import { Link } from "react-router-dom";

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
  let maximo = dogs.length / cantidad;

  const [buscador, setBuscador] = useState("");
  const [filtro, setFitro] = useState("");
  const [temp, setTemp] = useState("");

  const filtereDogs = () => {
    if (buscador.length) {
      const filtrados = dogs.filter((dog) =>
        dog.name.toLowerCase().includes(buscador.toLowerCase())
      );
      maximo = filtrados.length / cantidad;
      return filtrados;
    }
    if (filtro === "Weight-Min") {
      dogs.sort((a, b) => {
        if (
          parseInt(
            typeof a.weight === "string"
              ? a.weight.split(" - ")[0]
              : a.weight.metric.split(" - ")[0]
          ) >
          parseInt(
            typeof b.weight === "string"
              ? b.weight.split(" - ")[0]
              : b.weight.metric.split(" - ")[0]
          )
        ) {
          return 1;
        }
        if (
          parseInt(
            typeof b.weight === "string"
              ? b.weight.split(" - ")[0]
              : b.weight.metric.split(" - ")[0]
          ) >
          parseInt(
            typeof a.weight === "string"
              ? a.weight.split(" - ")[0]
              : a.weight.metric.split(" - ")[0]
          )
        ) {
          return -1;
        }
        return 0;
      });
    }
    if (filtro === "Weight-Max") {
      dogs.sort((a, b) => {
        if (
          parseInt(
            typeof a.weight === "string"
              ? a.weight.split(" - ")[0]
              : a.weight.metric.split(" - ")[0]
          ) >
          parseInt(
            typeof b.weight === "string"
              ? b.weight.split(" - ")[0]
              : b.weight.metric.split(" - ")[0]
          )
        ) {
          return -1;
        }
        if (
          parseInt(
            typeof b.weight === "string"
              ? b.weight.split(" - ")[0]
              : b.weight.metric.split(" - ")[0]
          ) >
          parseInt(
            typeof a.weight === "string"
              ? a.weight.split(" - ")[0]
              : a.weight.metric.split(" - ")[0]
          )
        ) {
          return 1;
        }
        return 0;
      });
    }

    if (filtro === "A-Z") {
      dogs.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (b.name > a.name) {
          return -1;
        }
        return 0;
      });
    }

    if (filtro === "Z-A") {
      dogs.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (b.name > a.name) {
          return 1;
        }
        return 0;
      });
    }
    if (temp === "Todos") {
      return dogs;
    }
    if (temp.length) {
      const filtrados = dogs.filter(
        (dog) =>
          typeof dog.temperament !== "undefined" &&
          dog.temperament.toLowerCase().includes(temp.toLowerCase())
      );
      maximo = filtrados.length / cantidad;
      return filtrados;
    }

    return dogs;
  };

  const handleSelect = (e) => {
    setFitro(e.target.value);
  };
  const tempSelect = (e) => {
    setTemp(e.target.value);
    setPagina(1);
  };
  const handleChange = (e) => {
    setBuscador(e.target.value);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Henry PI Dogs Jorge Daniel</h1>
      <div className={style.filtro}>
        <div className={style.item}>
          <section>
            <p>Search: </p>
            <input type="text" onChange={handleChange} />
          </section>
        </div>
        <div className={style.item}>
          <section>
            <select onChange={handleSelect}>
              <option disabled selected defaultValue>
              Alphabetical order
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
              Filter by weight
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
      <div className={style.main_container}>
        {state.length ? (
          <div className={style.container_cards}>
            {filtereDogs()
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
                          : dog.weight.imperial
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
        ) : (
          <h1>Cargando..... ;)</h1>
        )}
        {state.length ? (
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
        ) : null}
      </div>
    </div>
  );
}

export default Home;

// return (
//   <div className={style.container}>
//     <h1 className={style.title}>Henry PI Dogs Jorge Daniel</h1>
//     <div className={style.filtro}>
//       <div className={style.item}>
//         <section>
//           <p>Search: </p>
//           <input type="text" onChange={handleChange} />
//         </section>
//       </div>
//       <div className={style.item}>
//         <section>
//           <p>Order:</p>
//           <select onChange={handleSelect}>
//             <option disabled selected defaultValue>
//               select
//             </option>
//             <option value="A-Z">A-Z</option>
//             <option value="Z-A">Z-A</option>
//             <option value="Weight-Min">Weight-Min</option>
//             <option value="Weight-Max">Weight-Max</option>
//           </select>
//         </section>
//       </div>
//       <div className={style.item}>
//         <section>
//           <p>Temperaments:</p>
//           <select name="temperament" onChange={tempSelect}>
//             <option disabled selected defaultValue>
//               temps
//             </option>
//             <option defaultValue>Todos</option>
//             {temps?.map((el) => (
//               <option value={el.name} key={el.id}>
//                 {el.name}
//               </option>
//             ))}
//           </select>
//         </section>
//       </div>
//     </div>
//     {state.length ? (
//       <div className={style.cards_container}>
//         {filtereDogs()
//           .slice((pagina - 1) * cantidad, (pagina - 1) * cantidad + cantidad)
//           .map((dog) => (
//             <div className={style.card_container} key={dog.id}>
//               <Link to={`/dogs/dog${dog.id}`}>
//                 <Card
//                   key={dog.id}
//                   id={dog.id}
//                   name={dog.name}
//                   temperament={dog.temperament}
//                   weight={
//                     typeof dog.weight === "string"
//                       ? dog.weight
//                       : dog.weight.imperial
//                   }
//                   image={
//                     typeof dog.image === "string" ? dog.image : dog.image.url
//                   }
//                 />
//               </Link>
//             </div>
//           ))}
//       </div>
//     ) : (
//       <h1>Cargando..... ;)</h1>
//     )}
//     {state.length ? (
//       <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
//     ) : null}
//   </div>
// );
// }

// export default Home;
