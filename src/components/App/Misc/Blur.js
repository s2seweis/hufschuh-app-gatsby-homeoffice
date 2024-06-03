import styled from "styled-components";

export const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) =>
    props.calculatedWidth ? props.calculatedWidth : "100vw"};
  height: 100%;
  z-index: ${(props) => (props.zIndex ? props.zIndex : 3)};

  background-color: hsla(0, 0%, 10%, 80%);
`;
