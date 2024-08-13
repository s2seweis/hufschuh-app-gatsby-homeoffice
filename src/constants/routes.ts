// also change in gatsby-config.js
const apiBase = `${process.env.API_HOST}/v1`;

const routes = {
  /* MAIN */
  login: "/login",
  register: "/register",

  newHorse: "/neues-pferd",
  editHorse: (id: string) => `/bearbeiten/${id}`,

  padsInformation: "/information-for-pads",
  confirmMail: "/confirm-mail",

  splashscreen: "/los",

  // password reset
  resetPassword: "/passwort-zuruecksetzen",
  passwordResetMailSent: "/email-versandt",
  setNewPassword: "/neues-passwort-vergeben",

  /* APP */
  app: "/",
  detailView: (id: string) => `/pferde/${id}`,
  photoGuide: ({
    id,
    pos,
    target,
  }: {
    id: string;
    pos: string;
    target: string;
  }) => `/pferde/${id}/photo-guide?pos=${pos}&target=${target}`,
  camera: ({ id, pos, target }: { id: string; pos: string; target: string }) =>
    `/pferde/${id}/kamera?pos=${pos}&target=${target}`,
  profile: "/profil",

  factFileGeneral: (id: string) => `/pferde/${id}/allgemeines`,
  factFileParticularities: (id: string) => `/pferde/${id}/besonderheiten`,

  about: "/ueber-uns",

  /* API */
  api: {
    base: apiBase,
    register: `${apiBase}/auth/register`,
    login: `${apiBase}/auth/login`,
    sendEmailConfirmation: `${apiBase}/auth/send-verification-email`,

    users: `${apiBase}/users`,
    user: (userId: string) => `${apiBase}/users/${userId}`,

    horses: `${apiBase}/horses`,
    horse: (id: string) => {
      return `${apiBase}/horses/${id}`;
    },
    fileUpload: `${apiBase}/upload`,

    // #here
    connectFacebook: `${apiBase}/auth/facebook`,
    connectFacebookCallback: `${apiBase}/auth/facebook/callback`,
    // #

    // #works
    connectGoogle: `${apiBase}/auth/google`,
    connectGoogleCallback: `${apiBase}/auth/google/callback`,
    // #

    forgotPassword: `${apiBase}/auth/forgot-password`,

    usersMe: `${apiBase}/users/me`,
    userInfo: `${apiBase}/user-infos`,
    updateUserInfo: (id: string) => {
      return `${apiBase}/user-infos/${id}`;
    },
    resetPassword: `${apiBase}/auth/reset-password`,
  },

  /* Webhooks */
  webhooks: {
    publish: "https://n.hufschuh.app/webhooks/mail-webhook",
  },

  /* external */
  landingpage: "https://hufschuh.app",
  imprint: "https://hufschuh.app/impressum/",
  privacy: "https://hufschuh.app/datenschutzerklaerung/",
};

// @ts-ignore
export default routes;
