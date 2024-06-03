import { connect } from "react-redux";
import { setUser } from "../../../redux/auth/action";
import ProfileComponent from "./Profile";

const mapStateToProps = (state, props) => {
  return {
    cms: props.cms,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => {
    dispatch(setUser(user));
  },
});

export const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);
