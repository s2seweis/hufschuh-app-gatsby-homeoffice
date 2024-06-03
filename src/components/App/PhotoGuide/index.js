import { connect } from "react-redux";
import PhotoGuideComponent from "./PhotoGuide";
import {
  patchHorse,
  patchLocalHorse,
  removeImagesBut,
} from "../../../redux/horses/action";
import store from "../../../redux/store";
import { uploadImage } from "../../../redux/upload/action";
import { parseTarget } from "./parse";
import { base64ToFile } from "../../../services/base64ToFile";
import { patchSelectedHorse } from "../../../redux/appState/action";
import * as Sentry from "@sentry/gatsby";

const mapStateToProps = (state, props) => {
  if (typeof window === "undefined") return;
  const { id, target, pos } = state.appState.selectedHorse;
  const horse = state.horses[id];
  return {
    name: horse?.name,
    pos: pos,
    target: target,
    images:
      target === "torso"
        ? horse?.images?.[target]
        : horse?.images?.[target]?.[pos],
    cms: props.cms,
    completed: target?.startsWith("leg")
      ? state.horses[id]?.completed[target][pos]
      : state.horses[id]?.completed[target],
    horse: horse,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { id, target, pos } = store.getState().appState.selectedHorse;
  return {
    uploadImage: () => {
      try {
        const jwt = store.getState().auth.user.tokenManager.jwt;
        const horse = store.getState().horses[id];
        const refId = horse.strapiIds.fotos;
        const ref = `horse.Fotos`;
        const file = base64ToFile({
          base64string:
            target === "torso"
              ? horse.images[target][0]
              : horse.images[target][pos][0],
          name: `${target}-${pos}.png`,
        });
        dispatch(
          uploadImage({
            file,
            ref,
            refId,
            field: parseTarget(target),
            jwt,
            target,
            pos,
          })
        );
      } catch (err) {
        Sentry.captureException(err);
      }
    },
    removeImagesBut: (index) => {
      dispatch(
        removeImagesBut({
          index,
          horseId: id,
          target,
          pos,
        })
      );
      dispatch(
        patchLocalHorse(id, {
          completed: {
            ...store.getState().horses[id].completed,
            [target]: target?.startsWith("leg")
              ? {
                  ...store.getState().horses[id].completed[target],
                  [pos]: true,
                }
              : true,
          },
        })
      );
    },
    reset: () => {
      dispatch(
        removeImagesBut({
          horseId: id,
          target,
          pos,
        })
      );
      dispatch(
        patchLocalHorse(id, {
          completed: {
            ...store.getState().horses[id].completed,
            [target]: target?.startsWith("leg")
              ? {
                  ...store.getState().horses[id].completed[target],
                  [pos]: false,
                }
              : false,
          },
        })
      );
    },
    patchSelectedHorse: (target, pos) =>
      dispatch(
        patchSelectedHorse({
          target: target,
          pos: pos,
        })
      ),
  };
  // addHorse: (name) => dispatch(addHorse(name)),
};

export const PhotoGuide = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGuideComponent);
