// returns an object with ids from strapi that are needed in the app
export function getStrapiIds(data) {
  return {
    horse: data.id,
    f1: data.Steckbrief_Allgemeines.id,
    f2: data.Steckbrief_Besonderheiten.id,
    fotos: data.Fotos.id,
  };
}
