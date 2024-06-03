import AppLayout from "../components/App/Layout";
import React from "react";
import { graphql } from "gatsby";
import routes from "../constants/routes";
import Profile from "../components/App/Profile/Profile";

export default function ProfilePage({ location, data }) {
  return (
    <AppLayout
      showNavigation={true}
      title={data.strapiProfil.Menu_Ueberschrift}
      location={location}
      showGuideButton={true}
      lastRoute={routes.app}
    >
      <Profile cms={data.strapiProfil} />
    </AppLayout>
  );
}

export const pageQuery = graphql`
  query {
    strapiProfil {
      Ueberschrift
      Menu_Ueberschrift
      Anrede
      Anrede_Optionen {
        strapi_json_value
      }
      Vorname
      Nachname
      Strasse
      PLZ
      Ort
      Mobil
      Land
      Logout
      Speichern
      Logout_Hinweis
      Alle_Felder
      Newsletter
      Fehler
      Hinweis_Mobil
      Bilder_Rechte
    }
  }
`;
