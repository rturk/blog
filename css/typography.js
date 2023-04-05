import css from "styled-jsx/css";

const style = css.global`
  body {
    font-family: sans-serif;
  }

  a[href] {
    color: var(--link-color);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: sans-serif;
  }
`;

export default style;
