import React from "react";
import AppLayout from "../../../components/App/Layout";
import { graphql, navigate } from "gatsby";
import routes from "../../../constants/routes";
import { PhotoGuideData } from "../../../components/App/PhotoGuide/PhotoGuideData";

export default function PhotoGuidePage(props: any) {
  const { data, location, id: horseId } = props;

  if (typeof window === "undefined") return

  const params = new Proxy(new URLSearchParams(location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
  });

  // @ts-ignore
  const { target, pos } = params;

  if (typeof pos === undefined || !target) {
    // @ts-ignore
    navigate(routes.detailView(horseId));
  }

  return (
    <AppLayout
      showNavigation={true}
      title={"Foto aufnehmen"}
      subtitleKey={"name"}
      horseId={horseId}
      location={location}
      lastRoute={routes.detailView(horseId)}
    >
      <PhotoGuideData
        cms={data.strapiKamera}
        horseId={horseId}
        pos={pos}
        target={target}
      />
    </AppLayout>
  );
}

export const pageQuery = graphql`
  {
    strapiKamera {
      Thumbnails {
        Fessel {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 64, layout: CONSTRAINED)
            }
          }
        }
        Hufbreite {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 64, layout: CONSTRAINED)
            }
          }
        }
        Huflaenge {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 64, layout: CONSTRAINED)
            }
          }
        }
        Bein_VR {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 64, layout: CONSTRAINED)
            }
          }
        }
        Bein_VL {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 64, layout: CONSTRAINED)
            }
          }
        }
        Bein_HR {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 64, layout: CONSTRAINED)
            }
          }
        }
        Bein_HL {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 64, layout: CONSTRAINED)
            }
          }
        }
        Koerper {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 64, layout: CONSTRAINED)
            }
          }
        }
      }
      Hinweis {
        Huflaenge
        Hufbreite
        Fessel
        Koerper
        VR
        VL
        HR
        HL
      }
      Photo_Guide_Texte {
        Starte_Aufnahme
        Keine_Bilder
        Aufnahme_Starten
        Auswahl_Bestaetigt
        Speichern
        Zuruecksetzen
      }
    }
  }
`;
