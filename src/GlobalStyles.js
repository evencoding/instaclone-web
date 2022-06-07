import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  bgColor: "#FFFFFF",
  fontColor: "rgb(38, 38, 38)",
  accent: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
  bgColor: "rgb(38, 38, 38)",
  fontColor: "#FFFFFF",
  accent: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size:14px;
        color: ${(props) => props.theme.fontColor};
        font-family: 'Open Sans', sans-serif;
        -ms-overflow-style:none;
      }
      body::-webkit-scrollbar { display:none; }
    a {
      text-decoration: none;
      color:inherit;
    }
`;
