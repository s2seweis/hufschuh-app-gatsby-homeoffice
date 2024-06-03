import PhotoGuideComponent from "./PhotoGuide";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  horseApi,
  useHorseQuery,
  useUpdateHorseMutation,
  useUploadImageMutation,
} from "../../../redux/api/horseApi";
import React, { useEffect } from "react";
import { LoadingSpinner } from "../../LoadingSpinner";
import { patchSelectedHorse } from "../../../redux/appState/appStateSlice";
import { Alert } from "@mui/material";
import { Horse } from "../../../redux/types";
import { useSnackbar } from "notistack";

type PhotoGuideDataProps = {
  cms: any;
  horseId: string;
  pos: string;
  target: string;
};

export const PhotoGuideData = ({
  cms,
  horseId,
  pos,
  target,
}: PhotoGuideDataProps) => {
  console.log("START");
  const user = useSelector((state: RootState) => state.auth.user);
  const appState = useSelector((state: RootState) => state.appState);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const {
    data: horseData,
    isLoading,
    isError,
  } = useHorseQuery(
    { userId: user?.id as string, horseId: horseId },
    {
      refetchOnMountOrArgChange: true,
      skip: !horseId || !user?.id,
    }
  );

  const refetchHook = horseApi.endpoints.horse.useQuerySubscription({
    userId: user?.id as string,
    horseId: horseId,
  }).refetch;

  const image =
    target && typeof pos !== undefined && target === "torso"
      ? horseData?.images?.torso
      : horseData?.images?.[target]?.[pos];

  const [updateHorse, updateHorseResult] = useUpdateHorseMutation();
  const [uploadImage, uploadImageResult] = useUploadImageMutation();

  const saveImage = (index: number) => {
    if (!index) {
      enqueueSnackbar("Bitte wähle eines der drei Bilder aus", {
        variant: "error",
      });
      return;
    }

    const image = appState.selectedHorse.temporaryImages[index - 1];

    uploadImage({
      userId: user?.id,
      horseId,
      data: {
        image,
      },
    });

    refetchHook();
  };

  const deleteImage = () => {
    updateHorse({
      userId: user?.id as string,
      horseId,
      data: {
        images: {
          [target]: target === "torso" ? null : { [pos]: null },
        },
      },
    });
  };

  useEffect(() => {
    if (uploadImageResult.isSuccess && typeof pos !== undefined && target) {
      const url = uploadImageResult?.data.url;

      updateHorse({
        userId: user?.id as string,
        horseId,
        data:
          target === "torso"
            ? ({
                images: {
                  torso: url,
                },
              } as Partial<Horse>)
            : ({
                images: {
                  [target]: {
                    [pos]: url,
                  },
                },
              } as Partial<Horse>),
      });

      dispatch(patchSelectedHorse({ selectedHorse: { temporaryImages: [] } }));
    }
  }, [uploadImageResult]);

  if (isLoading || uploadImageResult.isLoading || updateHorseResult.isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <Alert severity={"error"}>Daten konnten nicht geladen werden.</Alert>
    );
  }

  if (updateHorseResult.isError) {
    return (
      <Alert severity={"error"}>Das Bild konnte nicht zugeordnet werden.</Alert>
    );
  }

  if (uploadImageResult.isError) {
    return (
      <Alert severity={"error"}>
        Das Bild konnte nicht gespeichert werden.
      </Alert>
    );
  }

  return (
    <PhotoGuideComponent
      pos={pos}
      target={target}
      images={image ? [image] : appState.selectedHorse.temporaryImages}
      cms={cms}
      completed={!!image}
      reset={deleteImage}
      horse={horseData}
      saveImage={saveImage}
    />
  );
};
