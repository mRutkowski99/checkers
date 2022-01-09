import styled from "styled-components";

export const StyledNav = styled.nav`
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 10;

  & > ul {
    list-style-type: none;

    & > li:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
`;
