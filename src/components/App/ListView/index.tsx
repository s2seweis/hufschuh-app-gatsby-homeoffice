import { useSelector } from "react-redux";
import React, { useState } from "react";
import { ListViewWrapper } from "./styled";
import HorseList from "./HorseList";
import { RootState } from "../../../redux/store";
import { useHorsesQuery } from "../../../redux/api/horseApi";
import { ModalData } from "./AddHorseModal/ModalData";

/**
 * displays the pferde list or a modal to add a new pferde, depending on state
 * @param cms - relevant content for this component from strapi
 * @returns {JSX.Element}
 */
function ListViewComponent({ cms }: { cms: any }) {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("line:11", user);
  console.log("line:12", user?.id);
  const data = useSelector((state: RootState) => state);
  console.log("line:13", data);
  
  const { data: horseData } = useHorsesQuery(user?.id as string, {
    refetchOnMountOrArgChange: true,
    skip: !user?.id,
  });
  console.log("line:14", horseData);

  // could be replaced by axios, but needs an access token because of the baseApi configuration

  return (
    <ListViewWrapper>
      <HorseList
        // @ts-ignore
        horses={horseData || []}
        cms={cms}
      />
    </ListViewWrapper>
  );
}

export const ListView = ListViewComponent;
