import React from "react";
import routes from "../constants/routes";
import { AboutStyle } from "../components/App/About/styled";
import AppLayout from "../components/App/Layout";

export default function AboutPage({ location }: { location: any }) {
  return (
    <AppLayout
      showNavigation={true}
      title={"Über"}
      location={location}
      showGuideButton={false}
      lastRoute={routes.app}
    >
      <AboutStyle>
        <h2>Über hufschuh.app</h2>
        <h3>Rechtliches</h3>
        <a href={routes.imprint}>Impressum</a>
        <a href={routes.privacy}>Datenschutzerklärung</a>
      </AboutStyle>
    </AppLayout>
  );
}
