import React, { useEffect, useRef, useState } from "react";
import { StaticQuery, graphql } from "gatsby";
import {
  GuideClose,
  GuideNav,
  GuidePage,
  GuidePageContainer,
  GuideStyles,
  StyledGuideImage,
} from "./styled";
import { Button } from "../Misc/Button";
import { CloseIcon } from "../../../assets/icons/Close";
import { Blur } from "../Misc/Blur";

export function Guide({ show, close }) {
  const [position, setPosition] = useState(0);
  const [canClose, setCanClose] = useState(false);
  const containerRef = useRef();
  const [height, setHeight] = useState(0);

  function update(pageNumber, change) {
    let newPosition = position + change;

    if (position === pageNumber - 1) {
      window.setTimeout(() => {
        setCanClose(true);
      }, 200);
    }

    if (newPosition >= pageNumber) {
      newPosition = 0;
    }

    if (newPosition <= -1) {
      newPosition = pageNumber - 1;
    }

    setPosition(newPosition);

    containerRef.current.style["margin-left"] =
      -1 * (newPosition * window.innerWidth) + "px";
  }

  function onResize() {
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
  });

  return (
    <StaticQuery
      query={graphql`
        query TextQuery {
          strapiGuide {
            Pages {
              Text
              Bild {
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 380)
                  }
                }
              }
            }
            Last
            Next
          }
        }
      `}
      render={(data) => {
        const pageNumber = data.strapiGuide.Pages.length;

        return (
          <GuideStyles show={show}>
            <Blur calculatedWidth={`calc(${pageNumber}* 100vw)`} />

            <GuidePageContainer ref={containerRef} height={height}>
              {/* Pages */}
              {data.strapiGuide.Pages.map((page, index) => {
                return (
                  <GuidePage key={"guide-page-" + index} height={height}>
                    <GuideClose canClose={canClose}>
                      <button onClick={close}>
                        <CloseIcon stroke={"red"} strokeWidth={"3px"} />
                      </button>
                    </GuideClose>

                    <div className={"content"}>
                      <div className={"guide-text"}>
                        <p>{page.Text}</p>
                      </div>
                      <div className={"guide-image"}>
                        <StyledGuideImage
                          image={
                            page.Bild.localFile.childImageSharp.gatsbyImageData
                          }
                          imgStyle={{
                            objectFit: "contain",
                            height: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </GuidePage>
                );
              })}
            </GuidePageContainer>

            {/* Nav */}
            <GuideNav className={"guide-nav"}>
              <Button
                className={"secondary"}
                onClick={() => {
                  update(pageNumber, -1);
                }}
              >
                {data.strapiGuide.Last}
              </Button>
              <Button
                className={"primary"}
                onClick={() => {
                  update(pageNumber, 1);
                }}
              >
                {data.strapiGuide.Next}
              </Button>
            </GuideNav>
          </GuideStyles>
        );
      }}
    />
  );
}
