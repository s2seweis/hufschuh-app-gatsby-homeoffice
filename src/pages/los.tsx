import React, { useEffect } from "react";
import routes from "../constants/routes";
import { graphql, navigate } from "gatsby";
import Layout from "../components/Layout";
import Go from "../components/App/SplashScreen";

export default function GoPage({ data }: { data: any }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.setTimeout(async () => {
        await navigate(routes.app);
      }, 2000);
    }
  }, []);

  return (
    <Layout>
      <Go cms={data.strapiSplashscreen} />
    </Layout>
  );
}

export const pageQuery = graphql`
  {
    strapiSplashscreen {
      App_Name
      Los
      Logo {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
