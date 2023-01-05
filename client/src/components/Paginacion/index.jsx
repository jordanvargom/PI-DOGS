import React, { useState } from "react";
import style from '../../stylesheets/Paginacion.module.css'
function Paginacion({ pagina, setPagina, maximo }) {
  const [input, setInput] = useState(1);

  function siguiente() {
    setPagina(pagina + 1);
    setInput(pagina + 1);
  }
  function anterior() {
    setPagina(pagina - 1);
    setInput(pagina - 1);
  }

  function numPagina(e) {
    if (e.keyCode === 13) {
      setPagina(parseInt(e.target.value));
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > Math.ceil(maximo) ||
        isNaN(parseInt(e.target.value))
      ) {
        setInput(1);
        setPagina(1);
      } else {
        setPagina(parseInt(e.target.value));
      }
    }
  }

  function onChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className={style.container}>
      <button onClick={anterior} disabled={pagina === 1 || pagina < 1} >
        anterior
      </button>
      <input
        onChange={(e) => onChange(e)}
        name="page"
        autoComplete="off"
        value={input > Math.ceil(maximo) ? 1 : input}
        onKeyDown={(e) => numPagina(e)}
      />
      <p>de {Math.ceil(maximo)}</p>
      <button
        onClick={siguiente}
        disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
      >
        sigiente
      </button>
    </div>
  );
}

export default Paginacion;
