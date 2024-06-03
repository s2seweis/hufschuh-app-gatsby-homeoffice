import React from "react";
import AppLayout from "../../../components/App/Layout";
import routes from "../../../constants/routes";
import { DetailViewData } from "../../../components/App/DetailView/DetailViewData";
import { graphql } from "gatsby";

export default function DetailViewPage({ id, data, location }) {
  const {
    strapiDetailansicht,
    strapiSteckbriefAllgemeines,
    logoBig,
    ...images
  } = data;

  return (
    <AppLayout
      title={"Detailansicht"}
      subtitleKey={"name"}
      horseId={id}
      showNavigation={true}
      lastRoute={routes.app}
      location={location}
      showGuideButton={true}
    >
      <DetailViewData
        horseId={id}
        cms={strapiDetailansicht}
        cmsHufschuheFuer={strapiSteckbriefAllgemeines}
        images={images}
      />
    </AppLayout>
  );
}

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export const pageQuery = graphql`
  query {
    strapiSteckbriefAllgemeines {
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
    }

    strapiDetailansicht {
      VL
      VR
      HL
      HR
      Senden
      Steckbriefe
      Torso_Bild
      Hufschuhe_Fuer
      Vorne
      Vorne_Hinten
      Hinten
      Allgemeines
      Besonderheiten
      Alle_Felder
      Veroeffentlicht_Am
      Verooeffentlichen

      Thumbnails {
        Fessel {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 128)
            }
          }
        }
        Hufbreite {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 128)
            }
          }
        }
        Huflaenge {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 128)
            }
          }
        }
        Koerper {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 128)
            }
          }
        }
      }

      Pferd_Modell {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 128)
          }
        }
      }
    }
  }
`;
