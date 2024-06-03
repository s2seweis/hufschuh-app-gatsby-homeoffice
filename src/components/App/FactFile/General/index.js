import { connect } from "react-redux";
import FactFileGeneralForm from "./FactFileGeneralForm";
import {
  patchHorse,
} from "../../../../redux/horses/action";

const mapStateToProps = (state, props) => {
  const horse = state.horses[state.appState.selectedHorse.id];
  return {
    horse: horse,
    cms: props.cms,
    cmsMisc: props.cmsMisc,
    initialState:
      state.horses[state.appState.selectedHorse.id]?.Steckbrief_Allgemeines,
  };
};

const mapDispatchToProps = (dispatch) => ({
  patchHorse: (id, patch) => dispatch(patchHorse(id, patch)),
});

export const General = connect(
  mapStateToProps,
  mapDispatchToProps
)(FactFileGeneralForm);
