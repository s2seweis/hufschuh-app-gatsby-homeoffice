import React from "react";
import { graphql } from "gatsby";
import AppLayout from "../components/App/Layout";
import { ListView } from "../components/App/ListView";

export default function IndexPage(props) {

  return (
    <AppLayout
      title={"Deine Pferde"}
      showNavigation={false}
      location={props.location}
      overflowY={"hidden"}
      showGuideButton={true}
    >
      {/*// eslint-disable-next-line*/}
      <ListView
        cms={props.data["strapiListenansicht"]}
      />
    </AppLayout>
  );
}

export const pageQuery = graphql`
  query {
    strapiListenansicht {
      Titel
      Erklaerung
      Platzhalter {
        CTA
        Button
      }
      Modal {
        Input_Foto
        Input_Foto_Aendern
        Input_Name
        Speichern
        Abbrechen
        Titel
        Titel_Pferd_Bearbeiten
        Alle_Felder
        Pferd_Loeschen
        Fehler
        Kein_Bild
      }
    }
  }
`;
