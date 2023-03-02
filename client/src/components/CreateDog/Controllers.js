export const validate = (
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    temperament,
    life_span
  ) => {
    if (name.length > 10) return "Name must be less than 10 characters";
    if (height_min % 2 !== 0 && height_min % 2 !== 1)
      return "The height min. must be an integer";
    if (height_max % 2 !== 0 && height_max % 2 !== 1)
      return "The height max. must be an integer";
    if (weight_min % 2 !== 0 && weight_min % 2 !== 1)
      return "The weight min. must be an integer";
    if (weight_max % 2 !== 0 && weight_max % 2 !== 1)
      return "The weight max. must be an integer";
    if (life_span % 2 !== 0 && life_span % 2 !== 1)
      return "The average lifespan should be an integer";
    if (parseInt(height_min) > parseInt(height_max))
      return "The min. height cannot be greater than the max. height";
    if (parseInt(weight_min) > parseInt(weight_max))
      return "The min. weight cannot be greater than the max. weight";
    if (!temperament.length) return "You must choose temperaments";
    if( !name.length ||
      !height_min.length||
      !height_max.length||
      !weight_min.length||
      !weight_max.length||
      !temperament.length||
      !life_span.length) return "Fields remain to be completed";
  
  };