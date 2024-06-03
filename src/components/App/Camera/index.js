import { connect } from "react-redux";
import CameraComponent from "./Camera";
import { addImage } from "../../../redux/horses/action";

const mapStateToProps = (state, props) => {
  const { id, target, pos } = state.appState.selectedHorse;
  return {
    horse: state.horses[id],
    target: target,
    pos: pos,
    cms: props.cms,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addImage: (horseId, target, pos, image) =>
    dispatch(addImage(horseId, target, pos, image)),
});

export const Camera = connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraComponent);
