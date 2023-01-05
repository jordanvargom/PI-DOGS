export let maximo = 0

export const filtereDogs = (dogs,buscador,cantidad,filtro,temp) => {
    maximo = dogs.length / cantidad 
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