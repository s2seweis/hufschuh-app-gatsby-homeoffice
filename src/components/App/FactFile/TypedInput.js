import React, { useEffect, useRef, useState } from "react";
import Input from "../Misc/Input";
import Select from "react-select";
import colors from "../../../constants/colors";
import ImageSelect from "./ImageSelect";
import { GatsbyImage } from "gatsby-plugin-image";
import {
  onImageSelectChange,
  onInputChange,
  onMultiSelectChange,
  onSelectChange,
  onStarRatingChange,
  onSwitchChange,
} from "./inputChangeHandlers";
import { Rating } from "react-simple-star-rating";
import { HoofshoeRanking } from "./General/styled";
import { spacing } from "../../../constants/spacing";
import Switch from "react-switch";
import { strapiArrayToOptions } from "../Misc/strapiArrayToOptions";
import { HelpButton } from "../Misc/HelpButton";

export function TypedInput(props) {
  const {
    type,
    images,
    state,
    setState,
    name,
    hint,
    showRanking,
    starSelectTitle,
    ...inputProps
  } = props;

  switch (type) {
    case "boolean": {
      return (
        <label style={{ width: "56px" }}>
          <Switch
            onChange={() => onSwitchChange({ setState, name })}
            checked={state[name]}
          />
        </label>
      );
    }
    case "textarea": {
      return (
        <textarea
          value={inputProps.value}
          name={name}
          onChange={(event) => onInputChange(event, state, setState)}
          className={"textarea"}
          rows={6}
        />
      );
    }
    case "select": {
      const options = strapiArrayToOptions(
        inputProps.options?.strapi_json_value
      );
      console.log("select, ", options, inputProps);
      return (
        <>
          <Select
            {...inputProps}
            defaultValue={inputProps.value}
            options={options}
            onChange={(newState) =>
              onSelectChange(newState, name, state, setState, options)
            }
            value={options[inputProps.value?.index]}
            isSearchable={false}
          />
          {hint}
        </>
      );
    }
    case "image-select": {
      return (
        <ImageSelect
          {...inputProps}
          images={[
            <GatsbyImage
              image={images[0].childImageSharp.gatsbyImageData}
              alt={"image select choice 1"}
            />,
            <GatsbyImage
              image={images[1].childImageSharp.gatsbyImageData}
              alt={"image select choice 1"}
            />,
            <GatsbyImage
              image={images[2].childImageSharp.gatsbyImageData}
              alt={"image select choice 1"}
            />,
          ]}
          checkmarkHorizontalPosition={"right"}
          onChange={(newState) =>
            onImageSelectChange({
              newState: newState,
              setState: setState,
              property: name,
            })
          }
          value={state[name]}
          options={inputProps.options.strapi_json_value}
        />
      );
    }

    case "star-rating": {
      const options = inputProps.options.strapi_json_value;
      const parsedOptions = Object.keys(options).map((key) => {
        return {
          value: options[key],
          label: options[key],
          color: colors.text.primary,
          isFluid: true,
        };
      });

      return (
        <>
          <div className={"input-group"}>
            <Select
              onChange={(newState) =>
                onMultiSelectChange(
                  newState,
                  "Letzte_Hufschuhe",
                  state,
                  setState
                )
              }
              value={state[name + "_selected"]}
              defaultValue={state[name + "_selected"]}
              isMulti
              isClearable={"true"}
              name="Letzte Hufschuhe"
              options={parsedOptions}
            />
          </div>

          <HoofshoeRanking className={"hoofshoe-rating"} show={showRanking}>
            <p>{starSelectTitle}</p>
            {/* eslint-disable-next-line */}
            {state.Letzte_Hufschuhe &&
              Object.keys(state.Letzte_Hufschuhe)?.map((key, index) => {
                const shoe = state.Letzte_Hufschuhe[key];
                return (
                  <li key={"Hufschuh-Bewertung" + index}>
                    <span className={"shoe-name"}>{shoe.name}</span>
                    <Rating
                      key={"rating-" + index}
                      size={5}
                      className={"rating"}
                      ratingValue={shoe.rating}
                      onClick={(value) =>
                        onStarRatingChange(shoe.name, value, state, setState)
                      }
                    />
                  </li>
                );
              })}
          </HoofshoeRanking>
        </>
      );
    }

    default: {
      return (
        <Input
          onChange={(event) => onInputChange(event, state, setState)}
          name={name}
          type={type}
          {...inputProps}
        />
      );
    }
  }
}

export function InputGroup({
  children,
  title,
  subtext,
  help,
  hint,
  showHint,
  insertAfterInput,
}) {
  const [showHelp, setShowHelp] = useState(false);
  const docRef = useRef();
  const [helpHeight, setHelpHeight] = useState(0);

  // create and append a fake help text element, to get the height
  // as transitions don't work for height: auto
  useEffect(() => {
    let p = document.createElement("p");
    p.textContent = help;
    p.style.opacity = "0";
    docRef.current.append(p);
    setHelpHeight(p.offsetHeight);
    p.remove();
  });

  return (
    <div className="input-group" ref={docRef}>
      <label>
        {title}{" "}
        <HelpButton
          onClick={() => setShowHelp((c) => !c)}
          className={"help-button"}
          type={"button"}
          style={{ display: help !== " " ? "flex" : "none" }}
        >
          ?
        </HelpButton>
      </label>
      <p className={"subtext"}>{subtext}</p>
      {children}
      <p className={"hint"} style={{ display: showHint ? "flex" : "none" }}>
        {hint}
      </p>
      <p
        className={"help-text"}
        style={{
          height: showHelp ? helpHeight : "0",
          margin: showHelp ? `0 0 ${spacing.space2xs} 0` : "0",
        }}
      >
        {help}
      </p>
      {insertAfterInput}
    </div>
  );
}
