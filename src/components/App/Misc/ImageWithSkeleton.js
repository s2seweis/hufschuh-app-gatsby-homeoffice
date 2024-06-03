import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { Checkmark } from "./Checkmark";

const Overlay = styled.div`
  position: absolute;
  display: ${(props) => (props.completed ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  height: 64px;
  width: 64px;
  z-index: 2;

  background-color: hsla(0, 0%, 30%, 70%);
  border-radius: 10px;
  font-size: 64px;
  color: lightgreen;
`;

export const ImageCheckmark = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  position: absolute;
  margin: -20px 0 0 48px;
  font-size: 1.2rem;
`;

export default function ImageWithSkeleton({
  image,
  height,
  width,
  className,
  showCheckmark,
  checked,
}) {
  if (image)
    return (
      <>
        <Overlay completed={checked}>
          ✓{/*<CheckmarkIcon stroke={"white"} height={64} width={64} />*/}
        </Overlay>
        <GatsbyImage image={image} className={className} alt={"Thumbnail"} />

        <ImageCheckmark show={showCheckmark}>
          <Checkmark completed={checked} />
        </ImageCheckmark>
      </>
    );
  else return <div style={{ height, width }} />;
}
