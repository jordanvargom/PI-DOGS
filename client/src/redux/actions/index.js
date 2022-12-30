import {
  DOG_DETAIL,
  GET_DOGS,
  GET_TEMPS,
  CLEARE_PAGE,
  ORDER_BY_NAME,
} from "./actionsTypes";
import axios from "axios";

export const get_dogs = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/dogs")
      .then((res) => dispatch({ type: GET_DOGS, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const dog_detail = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/dogs/${id}`)
      .then((res) => dispatch({ type: DOG_DETAIL, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const get_temps = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/temps")
      .then((res) => dispatch({ type: GET_TEMPS, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const cleare_page = () => {
  return {
    type: CLEARE_PAGE,
  };
};

export const create_dog = (payload) => {
  return async function () {
    const data = await axios.post("http://localhost:3001/dogs", payload);
    return data;
  };
};

export const order_by_name = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};
