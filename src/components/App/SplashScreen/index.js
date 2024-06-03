import React from "react";
import { Splashscreen } from "./styled";
import Layout from "../../Layout";
import { GatsbyImage } from "gatsby-plugin-image";

export default function Go({ cms }) {
  return (
    <Layout>
      <Splashscreen>
        <div className={"app-name"}>{cms.App_Name}</div>
        <div>
          <GatsbyImage
            image={cms.Logo.localFile.childImageSharp.gatsbyImageData}
            className={"logo"}
            alt={"Logo"}
            layout={"fullWidth"}
          />
        </div>
        <div className={"go"}>{cms.Los}</div>
      </Splashscreen>
    </Layout>
  );
}
