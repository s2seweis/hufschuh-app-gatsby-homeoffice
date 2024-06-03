import React, { Fragment } from "react";
import ReduxWrapper from "../../../redux/ReduxWrapper";
import { ContentWrapper } from "./styled";
import Header from "./Header";
import { setError } from "../../../redux/appState/action";
import { useSelector } from "react-redux";
import GlobalStyle from "../../Layout/GlobalStyle";
import Meta from "../../Layout/META";
import LoginPage from "../../../pages/login";
import routes from "../../../constants/routes";
import { navigate } from "gatsby";
import store from "../../../redux/store";
import { reportError } from "../../../services/reportError";
import { useGetUserQuery } from "../../../redux/api/userApi";
import { SnackbarProvider } from "notistack";


function AppLayoutComponent({
  title,
  subtitle,
  description,
  children,
  lastRoute,
  showNavigation,
  showHeader = true,
  wrapContent = true,
  location,
  logout,
  overflowY,
  showGuideButton,
}) {
  const authState = useSelector((state) => state.auth);
  const appState = useSelector((state) => state.appState);

  const { data: userData } = useGetUserQuery(authState.user?.id, {
    refetchOnMountOrArgChange: true,
    skip: !authState.user?.id,
  });

  // const { data: horseData, isLoading } = useGetHorseQuery(
  //   { userId: authState.user?.id, horseId: horseId },
  //   {
  //     refetchOnMountOrArgChange: true,
  //     // skip: !horseId || !location.pathname.startsWith("/pferde"),
  //   }
  // );

  if (typeof window === "undefined") return "";

  if (appState?.error) {
    return (
      <div>
        <h1>Ein Fehler ist aufgetreten.</h1>
        <button
          onClick={() => {
            reportError(store.getState());
            store.dispatch(setError(false));
          }}
        >
          Bericht senden
        </button>
      </div>
    );
  }

  if (authState.user && userData) {
    // if auth hasn't filled out his profile yet, navigate to it
    if (
      authState.user &&
      !userData.firstName &&
      location.pathname !== routes.profile
    ) {
      // eslint-disable-next-line
      navigate(routes.profile);
    }

    const pathnameRegExp = new RegExp("/pferde/[a-zA-Z0-9]*$");
    return (
      <Fragment>
        <Meta title={title} description={description} />
        <GlobalStyle />

        <Header
          title={title}
          // subtitle={subtitleKey ? horseData?.[subtitleKey] : subtitle}
          lastRoute={lastRoute}
          showNavigation={showNavigation}
          showHeader={showHeader}
          logout={logout}
          showProfile={
            location.pathname === "/" ||
            location.pathname === "" ||
            pathnameRegExp.test(location.pathname)
          }
          showGuideButton={showGuideButton}
          user={userData}
        />
        <ContentWrapper overflowY={overflowY} show={wrapContent}>
          <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
        </ContentWrapper>
      </Fragment>
    );
  } else if (authState?.loading) {
    return (
      <>
        <Meta title={title} description={description} />
        <GlobalStyle />
        <Header
          title={title}
          subtitle={subtitle}
          lastRoute={lastRoute}
          showNavigation={showNavigation}
          showHeader={showHeader}
          showProfile={false}
          showGuideButton={showGuideButton}
        />
      </>
    );
  } else {
    return <LoginPage />;
  }
}

/*
  wrapp with redux state
 */
function AppLayout(props) {
  return (
    <ReduxWrapper>
      <AppLayoutComponent {...props} />
    </ReduxWrapper>
  );
}

export default AppLayout;
