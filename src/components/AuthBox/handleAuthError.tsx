import React from "react";

export default function handleAuthError({
  error,
  setMessage,
  setShaking,
  setErrorButton,
  sendEmailConfirmation,
}: {
  error: any;
  setMessage: (arg0: string) => void;
  setShaking: (arg0: boolean) => void;
  setErrorButton: (arg0: any) => void;
  sendEmailConfirmation: () => void;
}): void {
  const message  = error?.data?.message;

console.log(error)
console.log("line:13", error)

  if (!message) {
    console.log("line:14", message);
    
    if (error?.status === "FETCH_ERROR") {
        setMessage("Es konnte keine Verbindung zum Server hergestellt werden.");
      setShaking(true);
      setErrorButton(null);
      return;
    }
    setMessage("Ein unbekannter Fehler ist aufgetreten.");
    setShaking(true);
    setErrorButton(null);
    return;
  }



  setShaking(true);
  switch (message) {
    case "Incorrect email or password": {
      setMessage("Diese Kombination ist uns nicht bekannt.");
      return;
    }
    case "Auth.form.error.confirmed": {
      setMessage("Bitte bestätige Dein Konto.");
      setErrorButton(
        <button onClick={sendEmailConfirmation}>Mail erneut senden</button>
      );
      return;
    }
    case "Email already taken": {
      //Email is already taken.
      setMessage("Ein Konto mit dieser E-Mail existiert bereits.");
      return;
    }
    default: {
      setMessage("Ein unbekannter Fehler ist aufgetreten.");
      return;
    }
  }
}
