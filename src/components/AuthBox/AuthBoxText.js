export default function AuthBoxText(mode) {
  if (mode === "register")
    return {
      authText: "Registrieren",
      ssoText: "oder melde dich an mit",
      buttonText: "Registrieren",
      // twitterButton: 'Sign up with Twitter',
      // googleButton: 'Sign up with Google',
      switchModes: "Bist du schon registriert?",
      switchModesCTA: "Anmelden",
      email: "E-Mail",
      password: "Passwort",
      confirmPassword: "Passwort Bestätigen",
      noMatch: "Die Passwörter stimmen nicht überein"
    };
  else
    return {
      authText: "Willkommen zurück",
      ssoText: "oder melde dich an mit",
      buttonText: "Anmelden",
      // twitterButton: 'Sign in with Twitter',
      // googleButton: 'Sign in with Google',
      switchModes: "Du hast noch keinen Account?",
      switchModesCTA: "Registriere dich jetzt",
      email: "E-Mail",
      password: "Passwort",
      forgotPassword: "Passwort vergessen?",
      noMatch: "Die Passwörter stimmen nicht überein"
    };
}
