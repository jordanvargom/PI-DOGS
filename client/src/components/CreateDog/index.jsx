import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_dog, get_temps } from "../../redux/actions";
import Temps from "./Temps";
import style from "../../stylesheets/CreateDog.module.css";
import { validate } from './Controllers'
import Swal from 'sweetalert2'
import { Redirect, useHistory } from 'react-router-dom';

function CreateDog() {

  const dispatch = useDispatch();
  const history = useHistory();

  const temps = useSelector((state) => state.temps);
  const [loading, setLoading] = useState(false)
  const [dogs, setDogs] = useState({
    name: "",
    image: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    temperament: [],
    life_span: "",
  });

  useEffect(() => {
    dispatch(get_temps());
  }, [dispatch]);

  function handleChange(e) {
    setDogs({
      ...dogs,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    const tempId = temps.find((el) => el.name === e.target.value && el.id);
    setDogs({
      ...dogs,
      temperament: [...dogs.temperament, tempId.id],
    });
  }

  function handleDelete(e) {
    setDogs({
      ...dogs,
      temperament: dogs.temperament.filter((el) => el !== e),
    });
  }

  async function submit(e) {
    e.preventDefault();
    if (typeof errorMessage === 'string') {
      return alert('El formulario contiene errores')
    }
    setLoading(true)

    const dog = await dispatch(create_dog(dogs));
    console.log(dog.data.name);
    setLoading(false)
    if (dog.data.name === dogs.name) {
      setDogs({
        name: "",
        image: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        temperament: [],
        life_span: "",
      });
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfully created breed',
        showConfirmButton: false,
        timer: 1500,
      })
      history.replace('/dogs')
    } else {
      Swal.fire({
        position: 'center',
        title: 'ups sorry :(',
        text: 'There was a server failure',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    }
  }

  const errorMessage = validate(
    dogs.name,
    dogs.height_min,
    dogs.height_max,
    dogs.weight_min,
    dogs.weight_max,
    dogs.temperament,
    dogs.life_span
  );

  let id = 1;

  return (
    <div className={style.main_container}>
      {loading ? (
        <div className={style.loadingContainer}>
          <div className={style.ldsfacebook}><div></div><div></div><div></div></div>


        </div>
      ) : (
        <>
          <div className={style.container}>

            <form onSubmit={(e) => submit(e)} className={style.form}>
              <div className={style.name}>
                <input
                  autoComplete="off"
                  type="text"
                  name="name"
                  placeholder="Name..."
                  onChange={handleChange}
                />
              </div>
              <div className={style.height_container}>
                <input
                  autoComplete="off"
                  type="text"
                  name="height_min"
                  placeholder="Min heigth..."
                  onChange={handleChange}
                />
                <input
                  className={style.max_height}
                  autoComplete="off"
                  type="text"
                  name="height_max"
                  placeholder="Max heigth..."
                  onChange={handleChange}
                />
              </div>
              <div className={style.weight_container}>
                <input
                  autoComplete="off"
                  type="text"
                  name="weight_min"
                  placeholder="Max weight..."
                  onChange={handleChange}
                />
                <input
                  className={style.max_weigth}
                  autoComplete="off"
                  type="text"
                  name="weight_max"
                  placeholder="Min weight..."
                  onChange={handleChange}
                />
              </div>
              <div className={style.image_container}>
                <input
                  autoComplete="off"
                  type="text"
                  name="image"
                  placeholder="Inage url..."
                  onChange={handleChange}
                />
              </div>
              <div className="life-span-container">
                <input
                  autoComplete="off"
                  type="text"
                  name="life_span"
                  placeholder="Life stam..."
                  onChange={handleChange}
                />
              </div>
              <div>
                <select name="temperament" onChange={handleSelect} className={style.select_temperaments}>
                  <option disabled selected>
                    Temperaments
                  </option>
                  {temps?.map((el) => (
                    <option value={el.name} key={el.id} >
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={style.temperament}>
                Added temperaments:{" "}
                {!dogs.temperament.length
                  ? "not yet added"
                  : dogs.temperament.map((el) => (
                    <div key={id++} onClick={() => handleDelete(el)}>
                      <Temps id={el} />
                    </div>
                  ))}
              </div>

              <p className={style.error}>{errorMessage}</p>
              <button type="submit" className={style.button_to_home} >
                Create Breed
              </button>
            </form>
          </div>
        </>
      )
      }
    </div>
  );
}

export default CreateDog;
