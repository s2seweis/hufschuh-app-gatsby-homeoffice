import { Link } from "gatsby";
import routes from "../../../../constants/routes";
import React from "react";
import { HorseListWrapper, HorseUl } from "./styled";
import Placeholder from "../Placeholder";
import { ProfilePicWrapper } from "../../Misc/ProfilePicWrapper";
import { EditIcon } from "../../../../assets/icons/Edit";
import { PlusIcon } from "../../../../assets/icons/PlusIcon";
import colors from "../../../../constants/colors";
import Logo from "../../Misc/Logo";
import { HorseHead } from "../../../../assets/icons/HorseHead";
import { Horse } from "../../../../redux/types";
import { navigate } from "gatsby";

type HorseListProps = {
  horses: Horse[];
  cms: any;
};

export default function HorseList({ horses, cms }: HorseListProps) {
  return (
    // @ts-ignore
    <HorseListWrapper>
      <Logo />
      <p style={{ margin: "0 auto" }}>{cms.Erklaerung}</p>
      <HorseUl>
        {horses.length ? (
          horses.map((horse: Horse, index) => {
            return (
              <li key={"pferde-" + index}>
                <Link
                  to={routes.detailView(horse.id)}
                  className={"link pferde-button"}
                >
                  <ProfilePicWrapper className={"large pferde-image"}>
                    {horse.profilePicture ? (
                      <img
                        src={horse.profilePicture}
                        alt={"Pferd Profilbild"}
                      />
                    ) : (
                      <HorseHead
                        fill={undefined}
                        stroke={undefined}
                        strokeLinecap={undefined}
                        strokeLinejoin={undefined}
                        strokeWidth={undefined}
                      />
                    )}
                  </ProfilePicWrapper>
                  <p className={"horse-name"}>{horse.name}</p>
                </Link>

                <button
                  className={"edit-button"}
                  onClick={() => {
                    navigate(routes.editHorse(horse.id));
                  }}
                >
                  <span>
                    <EditIcon
                      fill={undefined}
                      stroke={undefined}
                      strokeLinecap={undefined}
                      strokeLinejoin={undefined}
                      strokeWidth={undefined}
                      width={undefined}
                      height={undefined}
                    />
                    Edit
                  </span>
                </button>
              </li>
            );
          })
        ) : (
          <Placeholder
            openModal={() => {
              navigate(routes.newHorse);
            }}
            cms={cms.Platzhalter}
          />
        )}
      </HorseUl>

      <button
        className={"add-horse"}
        style={{
          display: Object.keys(horses).length ? "flex" : "none",
        }}
        onClick={() => {
          navigate(routes.newHorse);
        }}
      >
        <PlusIcon
          fill={colors.pineGreen["80"]}
          stroke={colors.pineGreen["80"]}
          strokeLinecap={undefined}
          strokeLineJoin={undefined}
          strokeWidth={undefined}
        />
      </button>
    </HorseListWrapper>
  );
}
