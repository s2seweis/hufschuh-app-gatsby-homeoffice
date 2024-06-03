import { useDispatch, useSelector } from "react-redux";
import DetailViewComponent from "./DetailView";
import { RootState } from "../../../redux/store";
import {
  useHorseQuery,
  useUpdateHorseMutation,
} from "../../../redux/api/horseApi";
import React, { useEffect } from "react";
import { patchSelectedHorse } from "../../../redux/appState/appStateSlice";

type DetailViewProps = {
  horseId: string;
  cms: any;
  cmsHufschuheFuer: any;
  images: any;
};

export const DetailViewData = ({
  horseId,
  cms,
  cmsHufschuheFuer,
}: DetailViewProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [canSend, setCanSend] = React.useState(false);

  const { data: horseData, isLoading } = useHorseQuery(
    { userId: user?.id as string, horseId: horseId },
    {
      refetchOnMountOrArgChange: true,
      skip: !horseId,
    }
  );

  const [updateHorse] = useUpdateHorseMutation();

  const saveHorse = async (horse: any) => {
    await updateHorse({
      userId: user?.id as string,
      horseId: horseId,
      data: horse,
    });
  };

  useEffect(() => {
    if (horseData) {
      const horse = horseData;

      const mandatoryFieldsFilledOut =
        !!horse.factFileGeneral?.height &&
        !!horse.factFileParticularities?.equineType &&
        !!horse.hoofBootsFor &&
        !!horse.images?.torso;

      const legFRPicturesTaken =
        !!horse.images?.legFR?.fetlock &&
        !!horse.images?.legFR?.hoofWidth &&
        !!horse.images?.legFR?.hoofLength;

      const legFLPicturesTaken =
        !!horse.images?.legFL?.fetlock &&
        !!horse.images?.legFL?.hoofWidth &&
        !!horse.images?.legFL?.hoofLength;

      const legHRPicturesTaken =
        !!horse.images?.legHR?.fetlock &&
        !!horse.images?.legHR?.hoofWidth &&
        !!horse.images?.legHR?.hoofLength;

      const legHLPicturesTaken =
        !!horse.images?.legHL?.fetlock &&
        !!horse.images?.legHL?.hoofWidth &&
        !!horse.images?.legHL?.hoofLength;

      if (mandatoryFieldsFilledOut) {
        switch (horseData.hoofBootsFor) {
          // VR + VL
          case cmsHufschuheFuer.Hufschuhe_Fuer.Optionen.strapi_json_value[0]: {
            if (legFRPicturesTaken && legFLPicturesTaken) {
              setCanSend(true);
            }
            break;
          }
          // VR + VL + HR + HL
          case cmsHufschuheFuer.Hufschuhe_Fuer.Optionen.strapi_json_value[1]: {
            if (
              legFRPicturesTaken &&
              legFLPicturesTaken &&
              legHRPicturesTaken &&
              legHLPicturesTaken
            ) {
              setCanSend(true);
            }
            break;
          }
          // HR + HL
          case cmsHufschuheFuer.Hufschuhe_Fuer.Optionen.strapi_json_value[2]: {
            if (legHRPicturesTaken && legHLPicturesTaken) {
              setCanSend(true);
            }
            break;
          }
          default: {
            setCanSend(false);
          }
        }
      } else {
        setCanSend(false);
      }
    }
  }, [horseData]);

  if (isLoading || !horseData) {
    return <span>Lädt..</span>;
  }

  return (
    <DetailViewComponent
      horse={horseData}
      cms={cms}
      patchSelectedHorse={(target: string, pos: number) =>
        dispatch(
          patchSelectedHorse({
            selectedHorse: {
              pos,
              target,
            },
          })
        )
      }
      cmsHufschuheFuer={cmsHufschuheFuer}
      patchHorse={saveHorse}
      user={user}
      canSend={canSend}
    />
  );
};
