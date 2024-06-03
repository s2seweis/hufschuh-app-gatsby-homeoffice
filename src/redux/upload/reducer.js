import { HORSE_CREATED, START_IMAGE_UPLOAD, UPLOAD_FAILED } from "./action";
import * as Sentry from "@sentry/gatsby";

export const upload = (state = {}, action) => {
  switch (action.type) {
    case START_IMAGE_UPLOAD: {
      // pferde successfully created & fact files uploaded
      return state;
    }

    case UPLOAD_FAILED: {
      console.log(action.formData);
      Sentry.captureMessage(
        "Upload permanently failed, target:" +
          action.target?.toString() +
          " ,pos: " +
          action.pos?.toString()
      );
    }

    default:
      return state;
  }
};
