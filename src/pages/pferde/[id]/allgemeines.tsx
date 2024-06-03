import React from "react";
import { graphql } from "gatsby";
import AppLayout from "../../../components/App/Layout";
import routes from "../../../constants/routes";
import { FactFileGeneralData } from "../../../components/App/FactFile/General/FactFileGeneralData";

export default function FactFileGeneralPage(props: any) {
  const { data, location, id: horseId } = props;

  return (
    <AppLayout
      title={"Allgemeines"}
      horseId={horseId}
      subtitleKey={"name"}
      showNavigation={true}
      location={location}
      lastRoute={routes.detailView(horseId)}
    >
      <FactFileGeneralData
        cms={data["strapiSteckbriefAllgemeines"]}
        cmsMisc={data["strapiMisc"]}
        horseId={horseId}
      />
    </AppLayout>
  );
}

export const pageQuery = graphql`
  {
    strapiMisc {
      StarSelectTitle
    }
    strapiSteckbriefAllgemeines {
      Meta {
        Titel
        Speichern
        FelderFehlen
      }
      Geburtsjahr {
        Titel
        Hilfstext
        Typ
        Subtext
      }
      Groesse {
        Titel
        Hilfstext
        Typ
        Subtext
      }
      Gewicht {
        Titel
        Hilfstext
        Typ
        Subtext
      }
      Letzte_Hufbearbeitung {
        Titel
        Hilfstext
        Typ
        Optionen {
          id
          strapi_json_value
        }
        Hinweis
        Erklaerung
        Gelesen
        InfoButton
        Subtext
      }
      Letzte_Hufschuhe {
        Titel
        Hilfstext
        Typ
        Optionen {
          id
          strapi_json_value
        }
        Subtext
      }
      Terrain {
        Titel
        Hilfstext
        Typ
        Optionen {
          id
          strapi_json_value
        }
        Subtext
        Titel_Andere
      }
      Hufform {
        Titel
        Hilfstext
        Typ
        Subtext
        Optionen {
          id
          strapi_json_value
        }
        Bild1 {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 128)
            }
          }
        }
        Bild2 {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 128)
            }
          }
        }
        Bild3 {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 128)
            }
          }
        }
      }
      Hufschuhe_Fuer {
        Titel
        Hilfstext
        Typ
        Optionen {
          id
          strapi_json_value
        }
        Bild1 {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 64, layout: CONSTRAINED)
            }
          }
        }
        Bild2 {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 64, layout: CONSTRAINED)
            }
          }
        }
        Bild3 {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 64, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`;
