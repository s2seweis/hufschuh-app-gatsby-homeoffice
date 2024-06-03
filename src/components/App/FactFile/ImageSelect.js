import React, { useState } from "react";
import styled from "styled-components";
import borderRadius from "../../../constants/borderRadius";
import { spacing } from "../../../constants/spacing";
import colors from "../../../constants/colors";
import { PhotoGuideWrapper } from "../PhotoGuide/styled";
import { InputGroup, TypedInput } from "./TypedInput";
import { FactFileForm } from "./styled";
import { Styles } from "../DetailView/HufschueheFuer/styled";

const ImageSelectWrapper = styled.div`
  width: ${(props) => props.width}px;
  // height: ${(props) => props.height}px;

  display: flex;
  flex-direction: row;

  ${PhotoGuideWrapper} & {
    flex-wrap: wrap;
    width: 100%;
    label {
      display: none;
    }
  }

  justify-content: space-between;

  .image-select-option {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    text-align: center;

    ${PhotoGuideWrapper} & {
      width: 47%;
      padding: 1.5%;
    }
  }
`;

export const ImageRadio = styled.div`
  width: 25vw;
  max-width: 120px;

  ${Styles} & {
    width: 25vw;
  }

  //height: calc(28vw + 10px);
  //max-height: calc(120px + 10px);
  margin-right: ${spacing.space2xs};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  border-style: solid;
  border-radius: ${borderRadius.medium};
  border-width: 2px;
  border-color: ${(props) =>
    props.checked ? colors.pineGreen["80"] : "white"};
  box-shadow: 1px 1px 4px ${colors.greys["200"]};

  cursor: pointer;
  background-color: transparent;
  font-size: 1rem;

  ${PhotoGuideWrapper} & {
    width: 100%;
    max-width: none;
    border-style: none;
    margin: 0;
  }

  ${FactFileForm} & {
    img {
      filter: none;
      -webkit-filter: none;
      -moz-filter: none;
      -o-filter: none;
      -ms-filter: none;
    }
  }

  img {
    width: 100%;
    //height: 100%;

    -webkit-filter: ${(props) =>
      !props.oneChosen || (props.oneChosen && props.checked)
        ? "grayscale(0%)"
        : "grayscale(100%)"};
    -moz-filter: ${(props) =>
      !props.oneChosen || (props.oneChosen && props.checked)
        ? "grayscale(0%)"
        : "grayscale(100%)"};
    -o-filter: ${(props) =>
      !props.oneChosen || (props.oneChosen && props.checked)
        ? "grayscale(0%)"
        : "grayscale(100%)"};
    -ms-filter: ${(props) =>
      !props.oneChosen || (props.oneChosen && props.checked)
        ? "grayscale(0%)"
        : "grayscale(100%)"};
    filter: ${(props) =>
      !props.oneChosen || (props.oneChosen && props.checked)
        ? "grayscale(0%)"
        : "grayscale(100%)"};
  }

  .checkmark {
    position: absolute;
    width: ${spacing.spaceMd};
    height: ${spacing.spaceMd};

    display: flex;
    justify-content: center;
    align-items: center;
    align-self: ${(props) =>
      props.checkmarkHorizontalPosition === "left" ? "flex-start" : "flex-end"};
    margin: ${spacing.space3xs} ${spacing.space3xs};

    border-radius: 999px;
    background-color: ${colors.pineGreen["40"]};
    opacity: ${(props) => (props.checked ? "1" : "0")};

    box-shadow: 0px 0px 6px 4px white;

    ${PhotoGuideWrapper} & {
      background-color: ${colors.green.primary};
      color: white;
    }
  }
`;

/**
 *
 * @param images - Array of JSX Elements (image components)
 * @param options - Array of Objects with value and name properties
 * @param onChange
 * @param value
 * @param chechmarkPosition
 * @returns {JSX.Element}
 * @constructor
 */

export default function ImageSelect({
  images,
  options,
  onChange,
  value,
  checkmarkHorizontalPosition,
}) {
  return (
    <ImageSelectWrapper>
      {options.map((option, index) => {
        return (
          <div className={"image-select-option"} key={"image-select" + option}>
            <ImageRadio
              type="radio"
              id={"id" + option}
              value={option}
              checked={option === value}
              onClick={() => {
                onChange(option);
              }}
              checkmarkHorizontalPosition={checkmarkHorizontalPosition}
              oneChosen={value !== false}
            >
              {images[index]}
              <span className={"checkmark"}>✓</span>
            </ImageRadio>

            <label htmlFor={"id" + option}>{option}</label>
          </div>
        );
      })}
    </ImageSelectWrapper>
  );
}
