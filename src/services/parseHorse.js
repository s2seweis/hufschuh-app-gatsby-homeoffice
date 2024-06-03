import routes from "../constants/routes";
import { getStrapiIds } from "./getStrapiIds";
import { markCompleted } from "./markCompleted";

// TODO move back to fact files
const completedInitialState = {
  Steckbrief_Besonderheiten: false,
  Steckbrief_Allgemeines: false,
  leg0: {
    1: false,
    2: false,
    3: false,
  },
  leg1: {
    1: false,
    2: false,
    3: false,
  },
  leg2: {
    1: false,
    2: false,
    3: false,
  },
  leg3: {
    1: false,
    2: false,
    3: false,
  },
  torso: false,
};

export const f2initial = {
  Equidenart: "",
  Rasse: "",
  Rasse_Andere: "",
  Reitweise: "",
  Reitweise_Andere: "",
  Nutzungszeit: "",
  Beschlagen: false,
  Vorerkrankungen: "",
  Vorerkrankungen_Andere: "",
  Hufvorerkrankungen: "",
  Hufvorerkrankungen_Andere: "",
  Stellungsanomalien: "",
  Stellungsanomalien_Andere: "",
};

export const f1initial = {
  Geburtsjahr: "",
  Groesse: "",
  Gewicht: "",
  Letzte_Hufbearbeitung: "",
  Letzte_Hufschuhe: {},
  Letzte_Hufschuhe_selected: [],
  Terrain: "",
  Terrain_Andere: "",
  Hufform: "",
  Hufbearbeitung_Gelesen: false,
};

// adjustments to the data sourced from strapi
// such as name differences (english/german), adding additional fields (array that tracks which fields are filled out, ..)
export function parseHorse(horse) {
  const {
    Name,
    Profil_Bild,
    Fotos,
    offer_created_at,
    user,
    updated_at,
    created_at,
    // Hufschuhe_Fuer,
    ...restHorse
  } = horse;

  const images = {
    torso: Fotos.Koerper ? [`${routes.api.base}${Fotos.Koerper.url}`] : "",
    leg0: {
      1: Fotos.Bein_VR[0] ? [`${routes.api.base}${Fotos.Bein_VR[0].url}`] : "",
      2: Fotos.Bein_VR[1] ? [`${routes.api.base}${Fotos.Bein_VR[1].url}`] : "",
      3: Fotos.Bein_VR[2] ? [`${routes.api.base}${Fotos.Bein_VR[2].url}`] : "",
    },
    leg1: {
      1: Fotos.Bein_VL[0] ? [`${routes.api.base}${Fotos.Bein_VL[0].url}`] : "",
      2: Fotos.Bein_VL[1] ? [`${routes.api.base}${Fotos.Bein_VL[1].url}`] : "",
      3: Fotos.Bein_VL[2] ? [`${routes.api.base}${Fotos.Bein_VL[2].url}`] : "",
    },
    leg2: {
      1: Fotos.Bein_HR[0] ? [`${routes.api.base}${Fotos.Bein_HR[0].url}`] : "",
      2: Fotos.Bein_HR[1] ? [`${routes.api.base}${Fotos.Bein_HR[1].url}`] : "",
      3: Fotos.Bein_HR[2] ? [`${routes.api.base}${Fotos.Bein_HR[2].url}`] : "",
    },
    leg3: {
      1: Fotos.Bein_HL[0] ? [`${routes.api.base}${Fotos.Bein_HL[0].url}`] : "",
      2: Fotos.Bein_HL[1] ? [`${routes.api.base}${Fotos.Bein_HL[1].url}`] : "",
      3: Fotos.Bein_HL[2] ? [`${routes.api.base}${Fotos.Bein_HL[2].url}`] : "",
    },
  };

  const parsedHorse = {
    ...restHorse,
    name: Name,
    profilePicture: Profil_Bild ? `${routes.api.base}${Profil_Bild.url}` : "",
    completed: completedInitialState,
    strapiIds: getStrapiIds(horse),
    images: images,
    // Hufschuhe_Fuer: {
    //   // index: cms[key].Optionen.indexOf(state[key]),
    //   value: Hufschuhe_Fuer,
    // },
    Steckbrief_Allgemeines: restHorse.Steckbrief_Allgemeines.Geburtsjahr
      ? restHorse.Steckbrief_Allgemeines
      : f1initial,
    Steckbrief_Besonderheiten: restHorse.Steckbrief_Besonderheiten.Equidenart
      ? restHorse.Steckbrief_Besonderheiten
      : f2initial,
  };
  // mark completed fields
  parsedHorse.completed = markCompleted(parsedHorse);
  return parsedHorse;
}

// accouts for difference in naming and structure between strapi and local databsee
// calls parseHorse for each individual pferde
export function parseHorses(horses) {
  // parse all pferde
  const parsedHorses = horses.map((horse) => parseHorse(horse));

  // construct objec
  const horseObject = {};
  parsedHorses.forEach((horse) => {
    horseObject[horse.id] = horse;
  });

  return horseObject;
}
