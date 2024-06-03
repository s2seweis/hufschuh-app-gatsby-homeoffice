/* input change handlers */
export function onInputChange(event, state, setState) {
  event.persist();
  setState((prevState) => ({
    ...prevState,
    [event.target.name]: event.target.value,
  }));
}

function getIndexFromOptions(options, value) {
  let valueIndex;
  options.forEach((option, index) => {
    if (option.value === value) valueIndex = index;
  });
  return valueIndex;
}

export function onSelectChange(newState, name, state, setState, options) {
  setState((prevState) => ({
    ...prevState,
    [name]: {
      value: newState.value,
      index: getIndexFromOptions(options, newState.value),
    },
  }));
}

export function onMultiSelectChange(newState, name, state, setState) {
  console.log(newState);
  let result = {};
  newState.map((elem) => {
    let currentRating = state["Letzte_Hufschuhe"][elem.value]?.rating;
    result[elem.label] = {
      name: elem.value,
      rating: currentRating ? currentRating : 1,
    };
  });
  setState((prevState) => ({
    ...prevState,
    [name]: result,
    [name + "_selected"]: newState,
  }));
}

// hard coded for the Hoof Shoe Rating Input
export function onStarRatingChange(name, value, state, setState, refresh) {
  const newState = Object.assign({}, state.Letzte_Hufschuhe);
  newState[name]["rating"] = value;
  setState((prevState) => ({
    ...prevState,
    Letzte_Hufschuhe: newState,
  }));
}

export function onImageSelectChange({ newState, property, setState }) {
  setState((prevState) => ({
    ...prevState,
    [property]: newState,
  }));
}

export function onSwitchChange({ setState, name }) {
  setState((prev) => ({
    ...prev,
    [name]: !prev[name],
  }));
}
