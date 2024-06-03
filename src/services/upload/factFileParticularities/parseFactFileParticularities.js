import { findOption } from "../../../components/App/Misc/strapiArrayToOptions";

const fieldMapping = {
  Equidenart: "equineType",
  Rasse: "race",
  Rasse_Andere: "raceOthers",
  Reitweise: "ridingStyle",
  Nutzungszeit: "weeklyRidingTime",
  Beschlagen: "hasHorseShoe",
  Vorerkrankungen: "preconditions",
  Vorerkrankungen_Andere: "preconditionsOther",
  Hufvorerkrankungen: "hoofPreconditions",
  Hufvorerkrankungen_Andere: "hoofPreconditionsOther",
  Stellungsanomalien: "positionAnomalies",
  Stellungsanomalien_Andere: "positionAnomaliesOther",
};

export function localToStrapi(state) {
  // attributes that need to be changed
  const {
    Equidenart,
    Reitweise,
    Vorerkrankungen,
    Nutzungszeit,
    Rasse,
    Hufvorerkrankungen,
    Stellungsanomalien,
    ...restState
  } = state;

  const convertedFields = {};
  const toConvert = [
    "Equidenart",
    "Reitweise",
    "Vorerkrankungen",
    "Nutzungszeit",
    "Rasse",
    "Hufvorerkrankungen",
    "Stellungsanomalien",
  ];

  toConvert.forEach((key) => {
    convertedFields[key] = state[key].value;
  });

  return Object.assign(restState, convertedFields);
}

export function strapiToLocal(state, cms) {
  // attributes that need to be changed
  const {
    Equidenart,
    Reitweise,
    Vorerkrankungen,
    Nutzungszeit,
    Rasse,
    Hufvorerkrankungen,
    Stellungsanomalien,
    ...restState
  } = state;

  const convertedFields = {};
  const toConvert = [
    "Equidenart",
    "Reitweise",
    "Vorerkrankungen",
    "Nutzungszeit",
    "Rasse",
    "Hufvorerkrankungen",
    "Stellungsanomalien",
  ];

  toConvert.forEach((key) => {
    convertedFields[key] = findOption(
      cms[key].Optionen.strapi_json_value,
      state[fieldMapping[key]]
    );
  });

  return Object.assign(restState, convertedFields);
}
