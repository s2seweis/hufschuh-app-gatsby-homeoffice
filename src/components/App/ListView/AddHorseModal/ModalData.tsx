import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { User } from "../../../../redux/types";
import {
  horseApi,
  useCreateHorseMutation,
  useDeleteHorseMutation,
  useHorseQuery,
  useUpdateHorseMutation,
} from "../../../../redux/api/horseApi";
import { ModalForm } from "./ModalForm";
import { SyntheticEvent, useEffect } from "react";
import * as Sentry from "@sentry/gatsby";
import React from "react";
import { useSnackbar } from "notistack";
import routes from "../../../../constants/routes";
import { navigate } from "gatsby";

type StateType = {
  name: string;
  profilePicture: string;
};

export const ModalData = ({ cms, horseId }: { cms: any; horseId: string }) => {
  const user = useSelector((state: RootState) => state.auth.user) as User;

  const { enqueueSnackbar } = useSnackbar();

  const [createHorse] = useCreateHorseMutation();
  const [updateHorse] = useUpdateHorseMutation();
  const [deleteHorse] = useDeleteHorseMutation();

  const horseQuery = useHorseQuery(
    { userId: user?.id as string, horseId: horseId as string },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      skip: !user?.id || !horseId,
    }
  );

  function onSubmit(state: StateType) {
    if (!state.name) {
      enqueueSnackbar(cms.Alle_Felder, { variant: "error" });
      return;
    }

    if (!state.profilePicture) {
      enqueueSnackbar(cms.Kein_Bild, { variant: "error" });
      return;
    }

    const patch = {
      name: state.name,
      ...(state.profilePicture && { profilePicture: state.profilePicture }),
    };

    if (horseId) {
      // patch name
      updateHorse({
        userId: user?.id,
        horseId: horseId,
        data: patch,
      }).then((result) => {
        // @ts-ignore
        if (result.error) {
          // @ts-ignore
          Sentry.captureException(result.error);
          enqueueSnackbar(cms.Fehler, { variant: "error" });

          // @ts-ignore
          if (result.error.response.status === 413) {
            // image too large
            enqueueSnackbar("Das Bild ist zu groß", { variant: "error" });
          }
          return;
        }
        navigate(routes.app);
      });
    }
  }

  if (horseQuery?.isLoading) {
    return <div>Loading...</div>;
  }

  if (horseQuery?.isError || !horseQuery?.data) {
    return <div>Fehler</div>;
  }

  return (
    <ModalForm
      cms={cms}
      initialState={
        horseQuery?.data || {
          name: "",
          profilePicture: "",
        }
      }
      newHorse={!horseId}
      onSubmit={onSubmit}
      deleteHorse={() => {
        if (horseId) {
          if (window.confirm("Pferd wirklich löschen?")) {
            deleteHorse({
              userId: user?.id,
              horseId: horseId,
            }).then((result) => {
              // @ts-ignore
              if (result.error) {
                // @ts-ignore
                Sentry.captureException(result.error);
                enqueueSnackbar(cms.Fehler, { variant: "error" });
                return;
              }
              navigate(routes.app);
            });
          }
        }
      }}
    />
  );
};
