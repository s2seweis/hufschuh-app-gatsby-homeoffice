import {
  useHorseQuery,
  useUpdateHorseMutation,
} from "../../../../redux/api/horseApi";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import routes from "../../../../constants/routes";
import { navigate } from "gatsby";
import FactFileParticularitiesForm, {
  f2initial,
} from "./FactFileParticularitiesForm";
import { Alert } from "@mui/material";
import { strapiToLocal } from "../../../../services/upload/factFileParticularities/parseFactFileParticularities";

type FactFileParticularitiesDataProps = {
  cms: any;
  horseId: string;
};

export const FactFileParticularitiesData = ({
  horseId,
  cms,
}: FactFileParticularitiesDataProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: horseData, isLoading } = useHorseQuery(
    { userId: user?.id as string, horseId: horseId },
    {
      refetchOnMountOrArgChange: true,
      skip: !horseId,
    }
  );

  const [updateHorse, updateHorseResult] = useUpdateHorseMutation();

  const saveFactFileParticularities = async (factFileParticularities: any) => {
    const horsePatch = {
      factFileParticularities: {
        equineType: factFileParticularities.Equidenart,
        race: factFileParticularities.Rasse,
        raceOthers: factFileParticularities.Rasse_Andere,
        ridingStyle: factFileParticularities.Reitweise,
        weeklyRidingTime: factFileParticularities.Nutzungszeit,
        hoofPreconditions: factFileParticularities.Hufvorerkrankungen,
        hoofPreconditionsOther:
          factFileParticularities.Hufvorerkrankungen_Andere,
        positionAnomalies: factFileParticularities.Stellungsanomalien,
        positionAnomaliesOther:
          factFileParticularities.Stellungsanomalien_Andere,
        preconditions: factFileParticularities.Vorerkrankungen,
        preconditionsOther: factFileParticularities.Vorerkrankungen_Andere,
      },
    };

    await updateHorse({
      userId: user?.id,
      horseId: horseId,
      data: horsePatch,
    });
  };

  useEffect(() => {
    if (updateHorseResult.isSuccess) {
      navigate(routes.detailView(horseId));
    }
  }, [updateHorseResult]);

  if (isLoading || updateHorseResult.isLoading) {
    return <span>Lädt..</span>;
  }

  if (updateHorseResult.error) {
    return <Alert severity={"error"}>Fehler beim Speichern</Alert>;
  }

  return (
    <FactFileParticularitiesForm
      cms={cms}
      saveFactFileParticularities={async (factFileParticularities: any) => {
        await saveFactFileParticularities(factFileParticularities);
      }}
      horse={horseData}
      initialState={
        horseData.factFileParticularities
          ? strapiToLocal(horseData.factFileParticularities, cms)
          : // {
            //   Equidenart: findOption(
            //     cms.Equidenart.Optionen.strapi_json_value,
            //     horseData.factFileParticularities.equineType
            //   ),
            //   Rasse: findOption(
            //     cms.Rasse.Optionen.strapi_json_value,
            //     horseData.factFileParticularities.race
            //   ),
            //   Rasse_Andere: horseData.factFileParticularities.raceOthers,
            //   Reitweise: findOption(
            //     cms.Reitweise.Optionen.strapi_json_value,
            //     horseData.factFileParticularities.ridingStyle
            //   ),
            //   Nutzungszeit: findOption(
            //     cms.Nutzungszeit.Optionen.strapi_json_value,
            //     horseData.factFileParticularities.weeklyRidingTime
            //   ),
            //   Beschlagen: horseData.factFileParticularities.hasHorseShoe,
            //   Vorerkrankungen: findOption(
            //     cms.Vorerkrankungen.Optionen.strapi_json_value,
            //     horseData.factFileParticularities.preconditions
            //   ),
            //   Vorerkrankungen_Andere:
            //     horseData.factFileParticularities.preconditionsOther,
            //   Hufvorerkrankungen: findOption(
            //     cms.Hufvorerkrankungen.Optionen.strapi_json_value,
            //     horseData.factFileParticularities.hoofPreconditions
            //   ),
            //   Hufvorerkrankungen_Andere:
            //     horseData.factFileParticularities.hoofPreconditionsOther,
            //   Stellungsanomalien: findOption(
            //     cms.Stellungsanomalien.Optionen.strapi_json_value,
            //     horseData.factFileParticularities.positionAnomalies
            //   ),
            //   Stellungsanomalien_Andere:
            //     horseData.factFileParticularities.positionAnomaliesOther,
            // }
            f2initial
      }
    />
  );
};
