export type ListResultBase = {
  limit: number;
  page: number;
  totalPages: number;
  totalResults: number;
};

export type Profile = {
  title: string;
  firstName: string;
  lastName: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  mobile: string;
  subscribedToNewsletter: boolean;
  grantedImageRights: boolean;
};

export type User = Profile & {
  id: string;
  completedGuide: boolean;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FactFileParticularities = {
  type: string;
  race: string;
  raceOthers: string;
  ridingStyle: string;
  weeklyRidingTime: string;
  hasHorseShow: boolean;
  hoofPreconditions: string;
  hoofPreconditionsOther: string;
  positionalAnomalies: string;
  positionalAnomaliesOther: string;
  preconditions: string;
  preconditionsOther: string;
};

export type FactFileGeneral = {
  yearOfBirth: number;
  height: number;
  lastHoofBoots: Object;
  weight: number;
  hoofShape: string;
  lastHoofTrimming: string;
  confirmedHoofTrimmingNote: boolean;
  terrain: string;
  terrainOther: string;
};

export type LegImages = {
  fetlock?: string;
  hoofWidth?: string;
  hoofLength?: string;
};

export type HorseImages = {
  torso?: string;
  legFR?: LegImages;
  legFL?: LegImages;
  legHR?: LegImages;
  legHL?: LegImages;
};

export type Horse = FactFileGeneral &
  FactFileParticularities & {
    id: string;
    name: string;
    images: HorseImages;
    profilePicture: string;
    hoofBootsFor: string;
    owner: string;
    offerCreatedAt?: string;
    inquiryAt?: string;
  };
