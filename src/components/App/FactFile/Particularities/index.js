import { connect } from "react-redux";
import FactFileParticularitiesForm from "./FactFileParticularitiesForm";
import {
  addFactFile,
  patchHorse,
  patchLocalHorse,
} from "../../../../redux/horses/action";
import store from "../../../../redux/store";
import { localToStrapi } from "../../../../services/upload/factFileParticularities/parseFactFileParticularities";

const mapStateToProps = (state, props) => {
  const { id, pos, target } = state.appState.selectedHorse;
  const horse = state.horses[id];
  return {
    horse: horse,
    pos: pos,
    target: target,
    cms: props.cms,
    initialState:
      state.horses[state.appState.selectedHorse.id]?.Steckbrief_Besonderheiten,
  };
};

const mapDispatchToProps = (dispatch) => ({
  patchHorse: (id, patch) => dispatch(patchHorse(id, patch)),
});

export const Particularities = connect(
  mapStateToProps,
  mapDispatchToProps
)(FactFileParticularitiesForm);
