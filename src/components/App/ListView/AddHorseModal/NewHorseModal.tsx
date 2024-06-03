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

export const NewHorseModal = ({ cms }: { cms: any }) => {
  const user = useSelector((state: RootState) => state.auth.user) as User;

  const { enqueueSnackbar } = useSnackbar();

  const [createHorse] = useCreateHorseMutation();

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

    // create new pferde
    createHorse({
      userId: user?.id,
      data: patch,
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
  return (
    <ModalForm
      cms={cms}
      initialState={{
        name: "",
        profilePicture: "",
      }}
      newHorse={true}
      onSubmit={onSubmit}
    />
  );
};
