import { graphql, StaticQuery } from "gatsby";
import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export function AuthBackground() {
  return "";
    // <StaticQuery
    //   query={graphql`
    //     query ImageQuery {
    //       paintBackground: file(relativePath: { eq: "authBackground.jpg" }) {
    //         childImageSharp {
    //           gatsbyImageData(
    //             transformOptions: {
    //               duotone: { highlight: "#b699ff", shadow: "#000000" }
    //             }
    //             layout: FULL_WIDTH
    //           )
    //         }
    //       }
    //     }
    //   `}
    //   render={(data) => (
    //     <div className={"auth-background"} draggable={false}>
    //       <GatsbyImage
    //         image={data.paintBackground.childImageSharp.gatsbyImageData}
    //         draggable={false}
    //         // style is applied to the wrapper element
    //         style={{
    //           top: "0px",
    //           left: "0px",
    //           height: "102vh",
    //           width: "102vw",
    //           marginLeft: "-1vw",
    //           marginTop: "-1vh",
    //           zIndex: "-1",
    //         }}
    //         // imgStyle is applied to the actual img element
    //         imgStyle={{ opacity: "0.3", filter: "blur(8px)" }}
    //       />
    //     </div>
    //   )}
    // />
  // );
}
