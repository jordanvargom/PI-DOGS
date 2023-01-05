export const validate = (
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