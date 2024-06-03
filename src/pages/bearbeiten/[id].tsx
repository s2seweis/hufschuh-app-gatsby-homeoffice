import React from "react";
import { graphql } from "gatsby";
import AppLayout from "../../components/App/Layout";
import { ModalData } from "../../components/App/ListView/AddHorseModal/ModalData";

// @ts-ignore
export default function IndexPage({ id, data, location }) {
  const { strapiListenansicht } = data;

  return (
    <AppLayout
      title={"Deine Pferde"}
      showNavigation={false}
      location={location}
      overflowY={"hidden"}
      showGuideButton={true}
    >
      <ModalData cms={strapiListenansicht.Modal} horseId={id} />
    </AppLayout>
  );
}

export const pageQuery = graphql`
  query {
    strapiListenansicht {
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
