export function parseTargetNew(target) {
  switch (target) {
    case "leg0":
      return "Bein_VR";
    case "leg1":
      return "Bein_VL";
    case "leg2":
      return "Bein_HR";
    case "leg3":
      return "Bein_HL";
    case "torso":
      return "Koerper";
  }
}

export function parseTarget(target) {
  switch (target) {
    case "legFR":
      return "Bein_VR";
    case "legFL":
      return "Bein_VL";
    case "legHR":
      return "Bein_HR";
    case "legHL":
      return "Bein_HL";
    case "torso":
      return "Koerper";
  }
}

export function parsePosNew(pos) {
  switch (pos) {
    case "torso":
      return "Koerper";
    case "fetlock":
      return "Fessel";
    case "hoofWidth":
      return "Hufbreite";
    case "hoofLength":
      return "Huflaenge";
  }
}

export function parsePos(pos) {
  switch (pos) {
    case "torso":
      return "Koerper";
    case "fetlock":
      return "Fessel";
    case "hoofWidth":
      return "Hufbreite";
    case "hoofLength":
      return "Huflaenge";
  }
}

export function parseLoc(target) {
  switch (target) {
    case "legFR": {
      return "vorderen rechten";
    }
    case "legFL": {
      return "vorderen linken";
    }
    case "legHR": {
      return "hinteren rechten";
    }
    case "legHL": {
      return "hinteren linken";
    }
  }
}
