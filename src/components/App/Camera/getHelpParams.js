import { parseLoc, parseTarget } from "../PhotoGuide/parse";

export function getHelpTexts({ target, pos, cms }) {
  switch (pos) {
    case "torso": {
      return [cms.Kamera_Texte.Koerper.Text_1, cms.Kamera_Texte.Koerper.Text_2];
    }
    case "fetlock": {
      // Fessel
      return [
        cms.Kamera_Texte.Fessel.Text_1.replace("{target}", parseLoc(target)),
        cms.Kamera_Texte.Fessel.Text_2.replace("{target}", parseLoc(target)),
        cms.Kamera_Texte.Fessel.Text_3.replace("{target}", parseLoc(target)),
        cms.Kamera_Texte.Fessel.Text_4.replace("{target}", parseLoc(target)),
        cms.Kamera_Texte.Fessel.Text_5.replace("{target}", parseLoc(target)),
      ];
    }
    case "hoofWidth": {
      // Hufbreite
      return [
        cms.Kamera_Texte.Huf.Text_1.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "breitesten"),
        cms.Kamera_Texte.Huf.Text_2.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "breitesten"),
        cms.Kamera_Texte.Huf.Text_3.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "breitesten"),
        cms.Kamera_Texte.Huf.Text_4.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "breitesten"),
        cms.Kamera_Texte.Huf.Text_5.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "breitesten"),
        cms.Kamera_Texte.Huf.Text_6.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "breitesten"),
        cms.Kamera_Texte.Huf.Text_7.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "breitesten"),
        cms.Kamera_Texte.Huf.Text_8.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "breitesten"),
      ];
    }
    case "hoofLength": {
      // Huflänge
      return [
        cms.Kamera_Texte.Huf.Text_1.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "längsten"),
        cms.Kamera_Texte.Huf.Text_2.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "längsten"),
        cms.Kamera_Texte.Huf.Text_3.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "längsten"),
        cms.Kamera_Texte.Huf.Text_4.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "längsten"),
        cms.Kamera_Texte.Huf.Text_5.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "längsten"),
        cms.Kamera_Texte.Huf.Text_6.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "längsten"),
        cms.Kamera_Texte.Huf.Text_7.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "längsten"),
        cms.Kamera_Texte.Huf.Text_8.replace(
          "{target}",
          parseLoc(target)
        ).replace("{mode}", "längsten"),
      ];
    }
  }
}

export function getHelpPageNumber(pos) {
  switch (pos) {
    case "torso":
      return 2;
    case "fetlock":
      return 5;
    case "hoofWidth":
      return 7;
    case "hoofLength":
      return 7;
  }
}

export function getHelpImages({ target, pos, cms }) {
  switch (pos) {
    case "torso": {
      // Fessel
      return [
        cms.Kamera_Texte.Koerper.Bild_1.localFile.childImageSharp
          .gatsbyImageData,
        cms.Kamera_Texte.Koerper.Bild_2.localFile.childImageSharp
          .gatsbyImageData,
      ];
    }
    case "fetlock": {
      // Fessel
      return [
        cms.Thumbnails[parseTarget(target)].localFile.childImageSharp
          .gatsbyImageData,
        cms.Kamera_Texte.Fessel.Bild_1.localFile.childImageSharp
          .gatsbyImageData,
        cms.Kamera_Texte.Fessel.Bild_2.localFile.childImageSharp
          .gatsbyImageData,
        cms.Kamera_Texte.Fessel.Bild_3.localFile.childImageSharp
          .gatsbyImageData,
        cms.Kamera_Texte.Fessel.Bild_4.localFile.childImageSharp
          .gatsbyImageData,
      ];
    }
    case "hoofWidth": {
      // Hufbreite
      return [
        cms.Thumbnails[parseTarget(target)].localFile.childImageSharp
          .gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_Breite.localFile.childImageSharp
          .gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_1.localFile.childImageSharp.gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_2.localFile.childImageSharp.gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_3.localFile.childImageSharp.gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_4.localFile.childImageSharp.gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_5.localFile.childImageSharp.gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_6.localFile.childImageSharp.gatsbyImageData,
      ];
    }
    case "hoofLength": {
      // Hufbreite
      return [
        cms.Thumbnails[parseTarget(target)].localFile.childImageSharp
          .gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_Laenge.localFile.childImageSharp
          .gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_1.localFile.childImageSharp.gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_2.localFile.childImageSharp.gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_3.localFile.childImageSharp.gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_4.localFile.childImageSharp.gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_5.localFile.childImageSharp.gatsbyImageData,
        cms.Kamera_Texte.Huf.Bild_6.localFile.childImageSharp.gatsbyImageData,
      ];
    }
  }
}
