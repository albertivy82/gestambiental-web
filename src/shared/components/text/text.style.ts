import styled from 'styled-components';

interface ContainerTextProps {
  color?: string;
  backgroundColor?: string;
  customMargin?: string;
  fontSize: string;
  fontFamily: 'RobotoMono-Bold' | 'RobotoMono-Light' | 'RobotoMono-Regular' | 'RobotoMono-SemiBold';
}

export const ContainerText = styled.span<ContainerTextProps>`
  ${({ color }) => color && `color: ${color};`}
  ${({ customMargin }) => customMargin && `margin: ${customMargin};`}

  padding-top: 3px;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize};
`;