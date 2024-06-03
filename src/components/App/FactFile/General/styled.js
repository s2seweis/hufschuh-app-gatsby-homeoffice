import styled from "styled-components";
import { spacing } from "../../../../constants/spacing";

export const HoofshoeRanking = styled.ul`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  margin: ${spacing.spaceSm} 0 0 0 !important;
  padding: 0;

  list-style: none;

  p {
    margin: 0;
    font-weight: bold;
  }

  li + li {
    margin-top: ${spacing.spaceXs};
  }

  li {
    display: grid;
    grid-template-columns: auto 132px;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  .shoe-name {
    grid-area: 1 / 1 / 2 / 2;
    margin-right: ${spacing.spaceXs};
  }

  .rating {
    min-width: 138px;
    grid-area: 1 / 2 / 2 / 3;

    svg {
      width: 18px;
      height: 18px;
    }
    span {
      margin-right: ${spacing.space2xs};
    }
  }
`;
