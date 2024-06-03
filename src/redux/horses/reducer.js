import {
  ADD_HORSE,
  ADD_IMAGE,
  DELETE_LOCAL_HORSE,
  PATCH_LOCAL_HORSE,
  REMOVE_HORSE,
  REMOVE_IMAGES_BUT,
  SET_HORSES,
} from "./action";

export const completedInitialState = {
  Steckbrief_Besonderheiten: false,
  Steckbrief_Allgemeines: false,
  legFR: {
    fetlock: false,
    hoofWidth: false,
    hoofLength: false,
  },
  legFL: {
    fetlock: false,
    hoofWidth: false,
    hoofLength: false,
  },
  legHR: {
    fetlock: false,
    hoofWidth: false,
    hoofLength: false,
  },
  legHL: {
    fetlock: false,
    hoofWidth: false,
    hoofLength: false,
  },
  torso: false,
};

export const horses = (state = {}, action) => {
  switch (action.type) {
    case SET_HORSES:
      return Object.assign({}, state, action.horses);

    case ADD_HORSE: {
      return Object.assign({}, state, {
        [action.id]: {
          id: action.id,
          strapiIds: action.strapiIds,
          name: action.name,
          profilePicture: action.profilePicture,
          completed: completedInitialState,
          images: {},
        },
      });
    }

    case PATCH_LOCAL_HORSE:
      return Object.assign({}, state, {
        ...state,
        [action.id]: Object.assign({}, state[action.id], action.patch),
      });

    case DELETE_LOCAL_HORSE:
      const clone = Object.assign({}, state);
      delete clone[action.id];
      return clone;

    case ADD_IMAGE: {
      // current state of the image field that the new picture is for
      const currentState =
        action.target === "torso"
          ? state[action.horseId].images[action.target]
          : state[action.horseId].images[action.target]?.[action.pos] || [];

      const horse = state[action.horseId];

      return Object.assign({}, state, {
        ...state,
        [action.horseId]: {
          ...horse,
          images: {
            ...horse.images,
            [action.target]: action.target.startsWith("leg")
              ? {
                  ...horse.images[action.target],
                  [action.pos]: currentState
                    ? currentState.concat(action.image)
                    : [action.image],
                }
              : currentState
              ? currentState.concat(action.image)
              : [action.image],
          },
        },
      });
    }

    case REMOVE_IMAGES_BUT: {
      const horse = state[action.horseId];

      console.log(action);

      // if no index, delete all images
      if (typeof action.index === "undefined") {
        console.log("no index, given, delete all images in target");
        console.log(
          Object.assign({}, state, {
            ...state,
            [action.horseId]: {
              ...horse,
              images: {
                ...horse.images,
                [action.target]: action.target.startsWith("leg")
                  ? {
                      ...horse.images[action.target],
                      [action.pos]: [],
                    }
                  : [],
              },
            },
          })
        );
        return Object.assign({}, state, {
          ...state,
          [action.horseId]: {
            ...horse,
            images: {
              ...horse.images,
              [action.target]: action.target.startsWith("leg")
                ? {
                    ...horse.images[action.target],
                    [action.pos]: [],
                  }
                : [],
            },
          },
        });
      }

      // current state of the image field that the new picture is for
      const currentState =
        action.target === "torso"
          ? state[action.horseId].images[action.target]
          : state[action.horseId].images[action.target]?.[action.pos] || [];
      const imageToKeep = currentState[action.index];
      console.log(
        currentState,
        action.target === "torso"
          ? state[action.horseId].images[action.target]
          : state[action.horseId].images[action.target]?.[action.pos] || []
      );

      // if (!currentState[0]) return Object.assign({}, state, {
      //   ...state,
      //   [action.horseId]: {
      //     ...pferde,
      //     images: {
      //       ...pferde.images,
      //       [action.target]: action.target.startsWith("leg")
      //         ? {
      //           ...pferde.images[action.target],
      //           [action.pos]: null,
      //         }
      //         : [imageToKeep],
      //     },
      //   },
      // });

      return Object.assign({}, state, {
        ...state,
        [action.horseId]: {
          ...horse,
          images: {
            ...horse.images,
            [action.target]: action.target.startsWith("leg")
              ? {
                  ...horse.images[action.target],
                  [action.pos]: [imageToKeep],
                }
              : [imageToKeep],
          },
        },
      });
    }

    case REMOVE_HORSE: {
      const copy = Object.assign({}, state);
      delete copy[action.horseId];
      return copy;
    }

    default:
      return state;
  }
};
