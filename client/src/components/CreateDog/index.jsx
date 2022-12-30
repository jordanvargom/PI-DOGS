import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_dog, get_temps } from "../../redux/actions";
import Temps from "./Temps";
import style from "../../stylesheets/CreateDog.module.css";
function CreateDog() {
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temps);

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
  }, []);

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

  function submit(e) {
    e.preventDefault();
    if(typeof errorMessage === 'string'){
      return alert('El formulario contiene errores')
    }
    dispatch(create_dog(dogs));
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
            Temperamntos Añadidos:{" "}
            {!dogs.temperament.length
              ? "aun no se añadieron temps"
              : dogs.temperament.map((el) => (
                  <div key={id++} onClick={() => handleDelete(el)}>
                    <Temps id={el} />
                  </div>
                ))}
          </div>

          <p className={style.error}>{errorMessage}</p>
          <button type="submit" className={style.button_to_home} >
            Crear Raza
          </button>
        </form>
      </div>
    </div>
  );
}

const validate = (
  name,
  height_min,
  height_max,
  weight_min,
  weight_max,
  temperament,
  life_span
) => {
  if (name.length > 10) return "El nombre debe ser menor a 10";
  if (height_min % 2 !== 0 && height_min % 2 !== 1)
    return "El altura min deve ser un entero";
  if (height_max % 2 !== 0 && height_max % 2 !== 1)
    return "El altura max deve ser un entero";
  if (weight_min % 2 !== 0 && weight_min % 2 !== 1)
    return "El peso min deve ser un entero";
  if (weight_max % 2 !== 0 && weight_max % 2 !== 1)
    return "El peso max deve ser un entero";
  if (life_span % 2 !== 0 && life_span % 2 !== 1)
    return "El promedio de vida deve ser un entero";
  if (height_min > height_max)
    return "La altura min no puede ser mayor que la altura max";
  if (weight_min > weight_max)
    return "El peso min no puede ser mayor que el peso max";
  if (!temperament.length) return "Debe elegir temperamentos";
  if( !name.length ||
    !height_min.length||
    !height_max.length||
    !weight_min.length||
    !weight_max.length||
    !temperament.length||
    !life_span.length) return "Faltan completar campos";

};

export default CreateDog;
