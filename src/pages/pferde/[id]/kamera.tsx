import React from "react";
import AppLayout from "../../../components/App/Layout";
import { graphql } from "gatsby";
import { CameraData } from "../../../components/App/Camera/CameraData";

export default function CameraPage(props: any) {
  const { id: horseId, data, location } = props;

  return (
    <AppLayout
      location={location}
      wrapContent={false}
      showHeader={false}
      horseId={horseId}
    >
      <CameraData cms={data.strapiKamera} horseId={horseId} />
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
              gatsbyImageData(width: 512, layout: CONSTRAINED)
            }
          }
        }
        Bein_VL {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 512, layout: CONSTRAINED)
            }
          }
        }
        Bein_HR {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 512, layout: CONSTRAINED)
            }
          }
        }
        Bein_HL {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 512, layout: CONSTRAINED)
            }
          }
        }
        Koerper {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 512, layout: CONSTRAINED)
            }
          }
        }
      }
      Kamera_Texte {
        Fessel {
          Text_1
          Text_2
          Text_3
          Text_4
          Text_5
          Bild_1 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 512, layout: CONSTRAINED)
              }
            }
          }
          Bild_2 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 512, layout: CONSTRAINED)
              }
            }
          }
          Bild_3 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 512, layout: CONSTRAINED)
              }
            }
          }
          Bild_4 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 512, layout: CONSTRAINED)
              }
            }
          }
        }
        Huf {
          Text_1
          Text_2
          Text_3
          Text_4
          Text_5
          Text_6
          Text_7
          Text_8
          Bild_Breite {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200, layout: CONSTRAINED)
              }
            }
          }
          Bild_Laenge {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200, layout: CONSTRAINED)
              }
            }
          }
          Bild_1 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200, layout: CONSTRAINED)
              }
            }
          }
          Bild_2 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200, layout: CONSTRAINED)
              }
            }
          }
          Bild_3 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200, layout: CONSTRAINED)
              }
            }
          }
          Bild_4 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200, layout: CONSTRAINED)
              }
            }
          }
          Bild_5 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200, layout: CONSTRAINED)
              }
            }
          }
          Bild_6 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200, layout: CONSTRAINED)
              }
            }
          }
        }
        Koerper {
          Text_1
          Text_2
          Bild_1 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200, layout: CONSTRAINED)
              }
            }
          }
          Bild_2 {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
