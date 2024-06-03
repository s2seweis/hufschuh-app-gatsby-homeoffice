import React from "react";
import { graphql } from "gatsby";
import AppLayout from "../../../components/App/Layout";
import { Particularities } from "../../../components/App/FactFile/Particularities";
import { General } from "../../../components/App/FactFile/General";
import routes from "../../../constants/routes";
import { FactFileParticularitiesData } from "../../../components/App/FactFile/Particularities/FactFileParticularitiesData";
import { classNames } from "react-select/dist/declarations/src/utils";

export default function FactFileParticularitiesPage(props: any) {
  const { data, location, id: horseId } = props;

  return (
    <AppLayout
      title={"Besonderheiten"}
      subtitleKey={"name"}
      horseId={horseId}
      showNavigation={true}
      lastRoute={routes.detailView(horseId)}
      location={location}
    >
      <FactFileParticularitiesData
        cms={data["strapiSteckbriefBesonderheiten"]}
        horseId={horseId}
      />
    </AppLayout>
  );
}

export const pageQuery = graphql`
  query {
    strapiSteckbriefBesonderheiten {
      Meta {
        Titel
        Speichern
        FelderFehlen
      }
      Equidenart {
        Titel
        Hilfstext
        Optionen {
          id
          strapi_json_value
        }
        Subtext
      }
      Rasse {
        Titel
        Hilfstext
        Optionen {
          id
          strapi_json_value
        }
        Titel_Mischung
        Subtext
      }
      Reitweise {
        Titel
        Hilfstext
        Optionen {
          id
          strapi_json_value
        }
        Subtext
        Titel_Andere
      }
      Nutzungszeit {
        Titel
        Hilfstext
        Typ
        Optionen {
          id
          strapi_json_value
        }
        Subtext
      }
      Beschlagen {
        Titel
        Hilfstext
        Typ
      }
      Vorerkrankungen {
        Titel
        Hilfstext
        Subtext
        Optionen {
          id
          strapi_json_value
        }
      }
      Hufvorerkrankungen {
        Titel
        Hilfstext
        Optionen {
          id
          strapi_json_value
        }
        Titel_Andere
        Subtext
      }
      Stellungsanomalien {
        Subtext
        Titel
        Hilfstext
        Optionen {
          id
          strapi_json_value
        }
        Titel_Andere
        Hinweis
      }
    }
  }
`;
