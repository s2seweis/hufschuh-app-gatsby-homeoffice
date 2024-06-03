/*
 * ACTION TYPES
 */
import routes from "../../constants/routes";
import axios from "axios";
import store from "../store";
import { base64ToFile } from "../../services/base64ToFile";
import { parseTarget } from "../../components/App/PhotoGuide/parse";
import * as Sentry from "@sentry/gatsby";
import { setError } from "../appState/action";

// starts the upload of images
export const START_IMAGE_UPLOAD = "START_IMAGE_UPLOAD";

// upload one image
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";

// one image uploaded successfully
export const IMAGE_UPLOADED = "IMAGE_UPLOADED";

// one request failed permanently
export const UPLOAD_FAILED = "UPLOAD_FAILED";

/*
 * ACTION CREATORS
 */

/**
 *
 * @param horseId
 * @param ids the strapi id's for the components (needed to upload and link the images)
 * @returns {{horseId, ids, type: string}}
 */
export function startImageUpload({ horse, user, ids }) {
  // Legs
  const dispatch = store.dispatch;
  const images = horse.images;

  Object.keys(images).forEach((target, index) => {
    if (target.startsWith("leg")) {
      Object.keys(images[target]).forEach((key, index) => {
        // these images are screenshots from a canvas, so they're all PNG's
        const pos = index + 1;
        console.log(target, pos);
        const file = base64ToFile({
          base64string: horse.images[target][pos][0],
          name: `${target}-${pos}.png`,
        });
        dispatch(
          uploadImage({
            file,
            ref: `horse.Fotos`,
            refId: ids.fotos,
            field: parseTarget(target),
            jwt: user.tokenManager.jwt,
            target: target,
            pos: pos,
          })
        );
      });
    } else {
      const file = base64ToFile({
        base64string: horse.images[target][0],
        name: `torso.png`,
      });
      dispatch(
        uploadImage({
          file,
          ref: `horse.Fotos`,
          refId: ids.fotos,
          field: "Koerper",
          jwt: user.tokenManager.jwt,
          target: target,
        })
      );
    }
  });
}

// const file = dataURItoFile(pferde.imageSrc, "example.png");

export function uploadImage({ file, ref, refId, field, jwt, target, pos }) {
  const formData = new FormData();
  formData.append("files", file);
  formData.append("ref", ref);
  formData.append("refId", refId);
  formData.append("field", field);

  axios
    .post(routes.api.fileUpload, formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-type": "multipart/form-data",
      },
    })
    .then((r) => console.log(r))
    .catch((err) => {
      console.err(err);
      Sentry.captureException(err);
      store.dispatch(
        setError({
          location: "uploadImage",
          params: { file, ref, refId, field, jwt, target, pos },
        })
      );
    });

  // return {
  //   type: UPLOAD_IMAGE,
  //   payload: { formData, jwt, target, pos },
  //   meta: {
  //     offline: {
  //       // the network action to execute:
  //       effect: {
  //         url: routes.api.fileUpload,
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${jwt}`,
  //           "Content-type": "multipart/form-data",
  //         },
  //         data: formData,
  //       },
  //       // action to dispatch when effect succeeds:
  //       commit: { type: IMAGE_UPLOADED, meta: { target, pos } },
  //       // action to dispatch if network action fails permanently:
  //       rollback: {
  //         type: UPLOAD_FAILED,
  //         meta: { target, pos },
  //         formData: formData,
  //       },
  //     },
  //   },
  // };
}
