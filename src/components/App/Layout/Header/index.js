import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import routes from "../../../../constants/routes";
import { ArrowLeft } from "../../../../assets/icons/ArrowLeft";
import { Fixed, HeaderWrapper } from "./styled";
import { AccountIcon } from "../../../../assets/icons/AccountIcon";
import { HelpButton } from "../../Misc/HelpButton";
import { Guide } from "../../Guide";
import axios from "axios";
import store, { RootState } from "../../../../redux/store";
import { setUser } from "../../../../redux/auth/action";
import * as Sentry from "@sentry/gatsby";
import { baseApi } from "../../../../redux/api/baseApi";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateHorseMutation } from "../../../../redux/api/horseApi";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../../redux/api/userApi";

export default function Header({
  title,
  subtitle,
  lastRoute,
  showNavigation,
  showHeader,
  showProfile,
  showGuideButton,
  user,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const appState = useSelector((state) => state.appState);
  const selectedHorse = appState.selectedHorse;

  const dispatch = useDispatch();

  const [updateUser, { isLoading: isUpdateMutationLoading }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setShowGuide(!user.completedGuide);
    }
  }, [user]);

  function closeGuide() {
    setShowGuide(false);
    if (!user.completedGuide) {
      updateUser({
        userId: user?.id,
        horseId: selectedHorse.id,
        patch: {
          completedGuide: true,
        },
      }).then((result) => {
        // @ts-ignore
        if (result.error) {
          Sentry.captureException(result.error);
        }
      });
    }
  }

  function logout() {
    // dispatch(baseApi.util.resetApiState());
    dispatch({
      type: "RESET_STATE",
    });
  }

  return (
    <HeaderWrapper show={showHeader}>
      <Fixed showNavigation={showNavigation}>
        <button
          onClick={() => (lastRoute ? navigate(lastRoute) : navigate(-1))}
          className={"arrow-left"}
        >
          <ArrowLeft stroke={"black"} />
        </button>
        <div className={"meta-title"}>
          <h4>{title}</h4>
          <span>{subtitle}</span>
        </div>
        <div
          className={"guide"}
          style={{ display: showGuideButton ? "flex" : "none" }}
        >
          <HelpButton onClick={() => setShowGuide(!showGuide)}>?</HelpButton>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={"account-icon"}
          style={{ display: showProfile ? "flex" : "none" }}
        >
          <AccountIcon />
        </button>
        <div className={"menu"} style={{ display: showMenu ? "flex" : "none" }}>
          <Link className={"menu-link"} to={routes.profile}>
            Profil
          </Link>
          <Link className={"menu-link"} to={routes.about}>
            Über
          </Link>
          <button className={"menu-link"} onClick={logout}>
            Abmelden
          </button>
        </div>
      </Fixed>
      <Guide show={showGuide} close={closeGuide} />
    </HeaderWrapper>
  );
}
