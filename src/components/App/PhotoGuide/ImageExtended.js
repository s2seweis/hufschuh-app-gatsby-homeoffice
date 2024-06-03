import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  //top: 50vh;
  //left: 50vw;
  //width: 1px;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;

  display: ${(props) => (props.open ? "flex" : "none")};
  z-index: 4;

  .large-image {
    position: absolute;
    display: ${(props) => (props.open ? "flex" : "none")};
    width: 90%;
    height: auto;
    z-index: 4;
  }

  .blur {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: hsla(0, 0%, 0%, 80%);
  }
`;

export default function ImageExtended({ src, alt, onShortClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageRef = useRef();
  const largeImageRef = useRef();

  const [touchStartFired, setTouchStartFired] = useState(false);
  const [touchEndFired, setTouchEndFired] = useState(false);
  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    imageRef.current.addEventListener("touchstart", onTouchStart);
    imageRef.current.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchstart", onClickAway);

    return () => {
      try {
        imageRef.current.removeEventListener("touchstart", onTouchStart);
        imageRef.current.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("touchstart", onClickAway);
      } catch (err) {}
    };
    // };
  });

  useEffect(() => {
    if (!touchStartFired) return;

    if (touchEndFired) {
      //reset
      setTouchEndFired(false);
      setTouchStartFired(false);
      setTimeOver(false);
    } else {
      setIsModalOpen(true);
    }
  }, [timeOver]);

  function onTouchEnd(event) {
    event.preventDefault();
    setTouchEndFired(true); // = true;
  }

  function onTouchStart(event) {
    onShortClick();
    if (touchStartFired) return;
    event.preventDefault();

    setTouchStartFired(true);

    window.setTimeout(() => {
      setTimeOver(true);
    }, 700);
  }

  function onClickAway(event) {
    if (!largeImageRef.current?.contains(event.target)) {
      setIsModalOpen(false);

      if (!isModalOpen) return;
      //reset
      setTouchEndFired(false);
      setTouchStartFired(false);
      setTimeOver(false);
    }
  }

  return (
    <>
      <img src={src} alt={alt || ""} ref={imageRef} />
      <Modal open={isModalOpen}>
        <img
          src={src}
          alt={alt || ""}
          className={"large-image"}
          ref={largeImageRef}
        />
        <div className={"blur"} />
      </Modal>
    </>
  );
}
