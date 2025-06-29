import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 2rem
      font-weight: 600;
    `}

    ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 2rem
      font-weight: 500;
    `}

    ${(props) =>
    props.type === "h4" &&
    css`
      font-size: 4rem
      font-weight: 700;
      text-align: center;
    `}

    /* @media (max-width: 768px) {
    font-size: 2.5rem;
  } */
  line-height: 1.4;
`;

export default Heading;
