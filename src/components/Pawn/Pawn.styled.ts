import styled from "styled-components";

interface IColors {
  outer: string;
  outerShadow: string;
  inner: string;
  innerBorder: string;
  crown: string;
}

interface IPawnColors {
  [key: string]: IColors;
}

const pawnColors: IPawnColors = {
  red: {
    outer: "rgba(228, 58, 58, 255)",
    outerShadow: "rgba(178, 17, 26, 255)",
    inner: "rgba(243, 79, 86, 255)",
    innerBorder: "rgba(213, 51, 62, 255)",
    crown: "rgba(0, 0, 0, 0.6)",
  },
  black: {
    outer: "rgba(51, 51, 51, 255)",
    outerShadow: "rgba(25, 25, 25, 255)",
    inner: "rgba(75, 75, 75, 255)",
    innerBorder: "rgba(63, 63, 63, 255)",
    crown: "rgba(255, 255, 255, 0.6)",
  },
};

interface IProps {
  color: string;
}

export const PawnOuter = styled.div`
  width: 75%;
  aspect-ratio: 1;
  border-radius: 100%;
  background-color: ${({ color }: IProps) => pawnColors[color].outer};
  filter: drop-shadow(
    0 5px 0 ${({ color }: IProps) => pawnColors[color].outerShadow}
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PawnInner = styled.div`
  width: 75%;
  aspect-ratio: 1;
  border-radius: 100%;
  background-color: ${({ color }: IProps) => pawnColors[color].inner};
  border: solid 1px ${({ color }: IProps) => pawnColors[color].innerBorder};
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 60%;
    fill: ${({ color }: IProps) => pawnColors[color].crown};
  }
`;
