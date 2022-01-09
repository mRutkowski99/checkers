import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

ul {
    list-style-type: none;

    & > li:not(:last-child) {
        margin-bottom: 1.5rem;
    }
}

html {
    font-size: 67.5%;
}

body {
    font-size: 1.6rem;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    padding: 2rem 0;
    display: flex;
    justify-content: center;
    background-color: rgb(255, 232, 220);
}
`;

export default GlobalStyle;
