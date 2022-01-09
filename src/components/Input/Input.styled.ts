import styled from "styled-components";

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;

  & > input {
    outline: none;
    border: solid 1px #000;
    border-radius: 0.25rem;
    font: inherit;
    font-size: inherit;
    padding: 0.25rem 0.5rem;
    width: 25rem;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
`;
