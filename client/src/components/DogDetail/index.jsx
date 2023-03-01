import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cleare_page, dog_detail } from "../../redux/actions";
import style from "../../stylesheets/DogDetail.module.css";

function DogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.dogsDetail);
  useEffect(() => {
    dispatch(dog_detail(id));
    return () => {
      dispatch(cleare_page());
    };
  }, [id, dispatch]);
  let temperaments = state.temperament && state.temperament.split(",");
  return (
    <div className={style.container}>
      {state.name ? (
        <>
          <h1 className={style.title}>Breed Detail: {state?.name}</h1>
          <section className={style.sub_container}>
            <div className={style.container_elements}>
              <div className={style.image_container}>
                <img
                  src={
                    typeof state?.image === "string"
                      ? state?.image
                      : state?.image?.url
                  }
                  alt={state?.name}
                />
              </div>
              <div className={style.right_container}>
                <h1>{state?.name}</h1>
                <h3>
                  Height:{" "}
                  {typeof state?.weight === "string"
                    ? state?.weight
                    : state?.weight?.metric}{" "}
                  Kg
                </h3>
                <h3>
                  Weight:{" "}
                  {typeof state?.height === "string"
                    ? state?.height
                    : state?.height?.metric}{" "}
                  Mts
                </h3>
                <h3>Lifespan: {state?.life_span}</h3>
                <div>
                  <h3 className={style.temps}>Temperaments:</h3>
                  <ul className={`${style.list_container}`}>
                    {temperaments &&
                      temperaments.map((t) => <li key={t}>{t.trim()}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className={style.loadingContainer}>
          <div className={style.ldsfacebook}><div></div><div></div><div></div></div>


        </div>
      )}
    </div>
  );
}

export default DogDetail;
