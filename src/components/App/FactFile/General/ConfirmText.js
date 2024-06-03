import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { spacing } from "../../../../constants/spacing";
import { Button } from "../../Misc/Button";

const ConfirmTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${spacing.spaceXs} 0;

  p {
    margin: 0 0 ${spacing.spaceSm};
    text-align: center;
  }

  .checkbox-row {
    display: flex;
    flex-direction: row;

    align-items: center;
  }

  input {
    width: ${spacing.spaceLg};
    height: ${spacing.spaceLg};
    margin: 0 ${spacing.spaceXs} 0 0;
  }

  label {
    margin: 0;
  }

  button {
    align-self: center;
    margin: ${spacing.spaceXs} 0 !important;
  }
`;

export default function ConfirmText({
  text,
  buttonText,
  value,
  onChange,
  name,
  checkboxText,
  link,
}) {
  return (
    <ConfirmTextWrapper>
      <p>{text}</p>
      <div className={"checkbox-row"}>
        <input
          id={"confirm-text-checkbox"}
          type={"checkbox"}
          onChange={(event) => onChange(event)}
          checked={value}
          name={name}
        />
        <label htmlFor={"confirm-text-checkbox"}>{checkboxText}</label>
      </div>
      <Button className={"secondary"} target={"_blank"} href={link}>
        {buttonText}
      </Button>
    </ConfirmTextWrapper>
  );
}
