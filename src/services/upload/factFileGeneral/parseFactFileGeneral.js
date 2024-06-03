export function localToStrapi(state) {
  // attributes that need to be changed

  const {
    Letzte_Hufbearbeitung,
    Terrain,
    Letzte_Hufschuhe_selected,
    ...restState
  } = state;

  return Object.assign(restState, {
    Letzte_Hufbearbeitung: Letzte_Hufbearbeitung.value,
    Terrain: Terrain.value,
  });
}

export function strapiToLocal(state, cms) {
  // attributes that need to be changed
  const { Letzte_Hufbearbeitung, Terrain, ...restState } = state;

  const Letzte_Hufschuhe = state.Letzte_Hufschuhe;
  const Letzte_Hufschuhe_selected = [];
  Object.keys(Letzte_Hufschuhe).forEach((key) => {
    const elem = Letzte_Hufschuhe[key];
    Letzte_Hufschuhe_selected.push({
      value: elem.name,
      label: elem.name,
      index: cms["Letzte_Hufschuhe"].Optionen.indexOf(elem.name),
    });
  });

  return Object.assign(restState, {
    Letzte_Hufbearbeitung: {
      index: cms["Letzte_Hufbearbeitung"].Optionen.indexOf(
        Letzte_Hufbearbeitung
      ),
      value: Letzte_Hufbearbeitung,
    },
    Terrain: {
      index: cms["Terrain"].Optionen.indexOf(Terrain),
      value: Terrain,
    },
    // Letzte_Hufschuhe: newLastShoes,
    Letzte_Hufschuhe_selected: Letzte_Hufschuhe_selected,
  });
}
