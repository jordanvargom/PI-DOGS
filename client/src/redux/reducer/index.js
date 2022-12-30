import {
  DOG_DETAIL,
  GET_DOGS,
  GET_TEMPS,
  CLEARE_PAGE,
  ORDER_BY_NAME,
} from "../actions/actionsTypes";

const initialState = {
  dogs: [],
  dogsDetail: {},
  temps: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
      };

    case DOG_DETAIL:
      if (Array.isArray(payload)) {
        return {
          ...state,
          dogsDetail: payload[0],
        };
      } else
        return {
          ...state,
          dogsDetail: payload,
        };

    case GET_TEMPS:
      return {
        ...state,
        temps: payload.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          }
        }),
      };

    case ORDER_BY_NAME:
      const alf =
        payload === "A-Z"
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        dogs: alf,
      };

    case CLEARE_PAGE:
      return {
        ...state,
        dogsDetail: {},
      };
    default:
      return state;
  }
}
