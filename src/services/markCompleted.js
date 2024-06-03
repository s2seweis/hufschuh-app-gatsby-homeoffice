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

// checks which fields are filled out
export function markCompleted(horse) {
  let completed = Object.assign({}, completedInitialState);
  let allFotos = true;

  if (horse.Steckbrief_Allgemeines?.Geburtsjahr) {
    completed["Steckbrief_Allgemeines"] = true;
  }
  if (horse.Steckbrief_Besonderheiten?.Equidenart) {
    completed["Steckbrief_Besonderheiten"] = true;
  }
  Object.keys(horse.images).forEach((key, index) => {
    const elem = horse.images[key];
    if (key.startsWith("leg")) {
      Object.keys(elem).forEach((legkey, legIndex) => {
        completed[key][legIndex + 1] =
          horse.images[key][legIndex + 1].length > 0;
        if (!horse.images[key][legIndex + 1].length > 0) {
          allFotos = false;
        }
      });
    } else if (key === "torso") {
      completed["torso"] = !!elem;
    }
  });

  return completed;
}
