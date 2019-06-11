import { Image } from "@mdx-deck/components";
import styled from "@emotion/styled";

const FadedImage = styled(Image)`
  background-color: white;
  background-image: ${props =>
    `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${
      props.url
    })`};
`;
export default FadedImage;
