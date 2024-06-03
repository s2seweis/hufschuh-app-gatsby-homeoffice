import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function Logo() {
  return (
    <StaticQuery
      query={graphql`
        {
          logoBig: file(relativePath: { eq: "logoBig.png" }) {
            childImageSharp {
              gatsbyImageData(width: 400, layout: CONSTRAINED)
            }
          }
        }
      `}
      render={(data) => (
        <LogoWrapper>
          <GatsbyImage
            image={data.logoBig.childImageSharp.gatsbyImageData}
            alt={"Equilandoo Logo"}
          />
        </LogoWrapper>
      )}
    />
  );
}
