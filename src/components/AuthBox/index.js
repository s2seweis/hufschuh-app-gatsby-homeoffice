import { setUser } from "../../redux/auth/action";
import { connect } from "react-redux";
import AuthBoxComponent from "./AuthBox";
import { login, register, sendEmailConfirmation } from "../../services/auth";
import { AuthBackground } from "./authBackground";

const mapStateToProps = (state, props) => {
  return {
    mode: props.mode,
    requestRegistration: register,
    AuthBackground: AuthBackground,
    sendEmailConfirmation: sendEmailConfirmation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

export const AuthBox = AuthBoxComponent;
