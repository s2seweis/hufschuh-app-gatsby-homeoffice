import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { HelpBlock, SmallImage } from "./styled";

export function getHoofHelpPage({ page, left, texts, images }) {
  switch (page) {
    case 0:
      return left ? (
        <HelpBlock>
          <p>{texts[0]}</p>
          <SmallImage image={images[0]} width={"140px"} />
        </HelpBlock>
      ) : (
        <HelpBlock>
          <p>{texts[1]}</p>

          <SmallImage image={images[1]} width={"130px"} />
        </HelpBlock>
      );
    case 1:
      return left ? (
        <HelpBlock>
          <p>{texts[2]}</p>
        </HelpBlock>
      ) : (
        <HelpBlock>
          <SmallImage image={images[3]} width={"220px"} />
        </HelpBlock>
      );
    case 2:
      return left ? (
        <HelpBlock>
          <p>{texts[3]}</p>
        </HelpBlock>
      ) : (
        <HelpBlock>
          <SmallImage image={images[4]} width={"220px"} />
        </HelpBlock>
      );
    case 3:
      return left ? (
        <HelpBlock>
          <p>{texts[4]}</p>
        </HelpBlock>
      ) : (
        <HelpBlock>
          <SmallImage image={images[5]} width={"220px"} />
        </HelpBlock>
      );
    case 4:
      return left ? (
        <HelpBlock>
          <p>{texts[5]}</p>
        </HelpBlock>
      ) : (
        <HelpBlock>
          <SmallImage image={images[1]} width={"220px"} />
        </HelpBlock>
      );
    case 5:
      return left ? (
        <HelpBlock>
          <p>{texts[6]}</p>
        </HelpBlock>
      ) : (
        <HelpBlock style={{ backgroundColor: "#9e9e9e" }}>
          <SmallImage image={images[6]} width={"220px"} />
        </HelpBlock>
      );
    case 6:
      return left ? (
        <HelpBlock>
          <p>{texts[7]}</p>
        </HelpBlock>
      ) : (
        <HelpBlock style={{ backgroundColor: "#a8a9a9" }}>
          <SmallImage image={images[7]} width={"250px"} />
        </HelpBlock>
      );
  }
}
