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
  const user2 = useSelector((state: RootState) => state.auth);
  console.log("line:100", user);
  console.log("line:101", user2);
  

  const { data: horseData } = useHorsesQuery(user?.id as string, {
    refetchOnMountOrArgChange: true,
    skip: !user?.id,
  });  

  console.log("line:200", horseData);
  

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
