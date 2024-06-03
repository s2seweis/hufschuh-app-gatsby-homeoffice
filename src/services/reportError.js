import axios from "axios";
import * as Sentry from "@sentry/gatsby";

export function reportError(data) {
  axios({
    method: "post",
    url: "https://webhook.site/fe952e91-445e-42fe-bb4a-d3280046c71a",
    data: JSON.stringify(data),
  }).catch((err) => {
    console.log(err);
    Sentry.captureException(err);
  });
}
