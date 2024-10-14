require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: process.env.GATSBY_STRAPI_API_URL,
  accessToken: process.env.GATSBY_STRAPI_TOKEN,
  ccollectionTypes: [],
  singleTypes: [
    "listenansicht",
    {
      singularName: "detailansicht",
      queryParams: {
        // Populate media and relations
        // Make sure to not specify the fields key so the api always returns the updatedAt
        populate: {
          image: "*",
          images: "*",
          Pferd_Modell: "*",
          Verooeffentlichen: "*",
          Thumbnails: {
            populate: {
              Fessel: "*",
              Hufbreite: "*",
              Huflaenge: "*",
              Koerper: "*",

              image: "*",
              images: "*",
            },
          },
        },
      },
    },
    {
      singularName: "steckbrief-allgemeines",
      queryParams: {
        populate: {
          image: "*",
          images: "*",
          Terrain: "*",
          Letzte_Hufbearbeitung: "*",
          Letzte_Hufschuhe: "*",
          Gewicht: "*",
          Groesse: "*",
          Geburtsjahr: "*",
          Meta: "*",
          Hufform: {
            populate: {
              image: "*",
              images: "*",
              Bild1: "*",
              Bild2: "*",
              Bild3: "*",
            },
          },
          Hufschuhe_Fuer: {
            populate: {
              image: "*",
              images: "*",
              Bild1: "*",
              Bild2: "*",
              Bild3: "*",
            },
          },
        },
      },
    },
    {
      singularName: "kamera",
      queryParams: {
        populate: {
          image: "*",
          images: "*",
          Thumbnails: {
            populate: {
              Fessel: "*",
              Hufbreite: "*",
              Huflaenge: "*",
              Koerper: "*",
              Bein_VR: "*",
              Bein_VL: "*",
              Bein_HR: "*",
              Bein_HL: "*",
              image: "*",
              images: "*",
            },
          },
          Hinweis: "*",
          Photo_Guide_Texte: "*",
          Kamera_Texte: {
            populate: {
              Fessel: {
                populate: {
                  Text_1: "*",
                  Text_2: "*",
                  Text_3: "*",
                  Text_4: "*",
                  Text_5: "*",

                  Bild_1: "*",
                  Bild_2: "*",
                  Bild_3: "*",
                  Bild_4: "*",
                },
              },
              Huf: {
                populate: {
                  Text_1: "*",
                  Text_2: "*",
                  Text_3: "*",
                  Text_4: "*",
                  Text_5: "*",
                  Text_6: "*",
                  Text_7: "*",
                  Text_8: "*",
                  Bild_Breite: "*",
                  Bild_Laenge: "*",

                  Bild_1: "*",
                  Bild_2: "*",
                  Bild_3: "*",
                  Bild_4: "*",
                  Bild_5: "*",
                  Bild_6: "*",
                },
              },
              Koerper: {
                populate: {
                  Text_1: "*",
                  Text_2: "*",
                  Bild_1: "*",
                  Bild_2: "*",
                },
              },

              image: "*",
              images: "*",
            },
          },
        },
      },
    },
    {
      singularName: "guide",
      queryParams: {
        populate: {
          image: "*",
          images: "*",
          Pages: {
            populate: {
              image: "*",
              images: "*",
              Bild: "*",
            },
          },
        },
      },
    },
    "steckbrief-besonderheiten",
    "kamera",
    "misc",
    "profil",
    "splashscreen",
    // "guide",
  ],
};

module.exports = {
  siteMetadata: {
    title: "Equilandoo App",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    `gatsby-plugin-image`,
    "gatsby-plugin-sharp",
    `gatsby-plugin-nodejs`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/assets/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Equilandoo `,
        short_name: `Equilandoo`,
        start_url: `/`,
        background_color: `hsl(320, 41%, 97%)`,
        theme_color: `hsl(175, 41%, 25%)`,
        display: `standalone`,
        icon: `src/assets/images/logo.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    // {
    //   resolve: "@sentry/gatsby",
    //   options: {
    //     dsn: "https://01cfeff40dc8455c8c589ee80125f2e8@o231393.ingest.sentry.io/5781743",
    //     sampleRate: 1,
    //     debug: true,
    //     attachStacktrace: true,
    //   },
    // },
  ],
};
