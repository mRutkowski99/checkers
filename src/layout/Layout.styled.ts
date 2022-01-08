import styled from "styled-components";

export const StyledLayout = styled.main`
  display: grid;
  grid-template-columns: repeat(3, min-content);
  grid-template-rows: min-content;
  gap: 2rem;

  & > div:first-child {
    align-self: end;
  }

  & > div:last-child {
    align-self: start;
  }
`;
