import styled from "styled-components";
import colors from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";

export const ProfilePicWrapper = styled.div`
  border-radius: 99px;
  border-width: 1px;
  border-color: ${colors.greys["500"]};
  overflow: hidden;

  background-color: ${colors.greys["50"]};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    path {
      //stroke: ${colors.primary["80"]};
      fill: ${colors.greys["300"]};
    }
  }

  &.small {
    width: ${spacing.spaceXl};

    height: ${spacing.spaceXl};
    svg {
      width: ${spacing.spaceXl};
      height: ${spacing.spaceXl};

      margin-left: -6px;
      margin-top: 3px;
    }

    img {
      width: ${spacing.spaceXl};
      // height: ${spacing.spaceXl};
    }
  }

  &.large {
    width: ${spacing.space2xl};
    min-width: ${spacing.space2xl};
    height: ${spacing.space2xl};

    svg {
      width: ${spacing.space2xl};
      height: ${spacing.space2xl};

      //margin-left: -12px;
      //margin-top: 12px;
    }

    img {
      width: ${spacing.space2xl};
      // height: ${spacing.space2xl};
    }
  }
`;
