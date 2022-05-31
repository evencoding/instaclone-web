import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  bgColor: "#FFFFFF",
  fontColor: "rgb(38, 38, 38)",
};

export const darkTheme = {
  bgColor: "rgb(38, 38, 38)",
  fontColor: "#FFFFFF",
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
        -ms-overflow-style:none;
      }
      body::-webkit-scrollbar { display:none; }
    a {
      text-decoration: none;
      color:inherit;
    }
`;
