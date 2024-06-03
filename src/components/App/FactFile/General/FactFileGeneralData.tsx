import FactFileGeneralForm, { f1initial } from "./FactFileGeneralForm";
import {
  useHorseQuery,
  useUpdateHorseMutation,
} from "../../../../redux/api/horseApi";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import routes from "../../../../constants/routes";
import { navigate } from "gatsby";
import { findOption } from "../../Misc/strapiArrayToOptions";

type FactFileGeneralDataProps = {
  cms: any;
  cmsMisc: any;
  horseId: string;
};

export const FactFileGeneralData = ({
  horseId,
  cms,
  cmsMisc,
}: FactFileGeneralDataProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: horseData, isLoading } = useHorseQuery(
    { userId: user?.id as string, horseId: horseId },
    {
      refetchOnMountOrArgChange: true,
      skip: !horseId,
    }
  );

  const [updateHorse] = useUpdateHorseMutation();

  const saveFactFileGeneral = async (factFileGeneral: any) => {
    const horsePatch = {
      factFileGeneral: {
        yearOfBirth: factFileGeneral.Geburtsjahr,
        height: factFileGeneral.Groesse,
        weight: factFileGeneral.Gewicht,
        lastHoofBoots: factFileGeneral.Letzte_Hufschuhe,
        hoofShape: factFileGeneral.Hufform,
        lastHoofTrimming: factFileGeneral.Letzte_Hufbearbeitung.value,
        confirmedHoofTrimmingNote: factFileGeneral.Hufbearbeitung_Gelesen,
        terrain: factFileGeneral.Terrain.value,
        terrainOther: factFileGeneral.Terrain_Andere,
      },
    };

    await updateHorse({
      userId: user?.id,
      horseId: horseId,
      data: horsePatch,
    });

    await navigate(routes.detailView(horseId));
  };

  if (isLoading) {
    return <span>Lädt..</span>;
  }

  return (
    <FactFileGeneralForm
      cms={cms}
      cmsMisc={cmsMisc}
      saveFactFileGeneral={(id: string, factFileGeneral: any) => {
        saveFactFileGeneral(factFileGeneral);
      }}
      horse={horseData}
      initialState={
        horseData.factFileGeneral
          ? {
              Geburtsjahr: horseData.factFileGeneral.yearOfBirth,
              Groesse: horseData.factFileGeneral.height,
              Gewicht: horseData.factFileGeneral.weight,
              Letzte_Hufschuhe: horseData.factFileGeneral.lastHoofBoots,
              Hufform: horseData.factFileGeneral.hoofShape,
              Letzte_Hufbearbeitung: findOption(
                cms.Letzte_Hufbearbeitung.Optionen.strapi_json_value,
                horseData.factFileGeneral.lastHoofTrimming
              ),
              Terrain: findOption(
                cms.Terrain.Optionen.strapi_json_value,
                horseData.factFileGeneral.terrain
              ),
              Terrain_Andere: horseData.factFileGeneral.terrainOther,
              Hufbearbeitung_Gelesen:
                horseData.factFileGeneral.confirmedHoofTrimmingNote,
              Letzte_Hufschuhe_selected: horseData.factFileGeneral
                ?.lastHoofBoots
                ? Object.keys(horseData.factFileGeneral.lastHoofBoots).map(
                    (bootKey) =>
                      findOption(
                        cms.Letzte_Hufschuhe.Optionen.strapi_json_value,
                        horseData.factFileGeneral?.lastHoofBoots?.[bootKey]
                          ?.name
                      )
                  )
                : [],
            }
          : f1initial
      }
    />
  );
};
