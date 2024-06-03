import _ from "lodash";
import { User } from "../redux/types";

export function pickProfileDataFromUser(user: User) {
  return _.pick(user, [
    "title",
    "firstName",
    "lastName",
    "street",
    "postcode",
    "city",
    "country",
    "phone",
    "subscribedToNewsletter",
    "grantedImageRights",
  ]);
}
