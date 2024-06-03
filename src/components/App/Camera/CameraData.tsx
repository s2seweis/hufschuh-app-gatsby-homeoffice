import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useHorseQuery } from "../../../redux/api/horseApi";
import { LoadingSpinner } from "../../LoadingSpinner";
import React from "react";
import CameraComponent from "./Camera";
import { addTemporaryImage } from "../../../redux/appState/appStateSlice";

export const CameraData = ({
  cms,
  horseId,
}: {
  cms: any;
  horseId: string;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  if (typeof window === "undefined") return;

  const params = new Proxy(new URLSearchParams(location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
  });

  // @ts-ignore
  const { target, pos } = params;

  const { data: horseData, isLoading } = useHorseQuery(
    { userId: user?.id as string, horseId: horseId },
    {
      refetchOnMountOrArgChange: true,
      skip: !horseId,
    }
  );

  const addImage = (temporaryImage: string) => {
    dispatch(addTemporaryImage({ temporaryImage }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <CameraComponent
      horse={horseData}
      target={target}
      pos={pos}
      addImage={addImage}
      cms={cms}
    />
  );
};
