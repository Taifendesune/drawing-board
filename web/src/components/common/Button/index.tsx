import styled from 'styled-components';

interface ButtonProps {
  size?: 's' | 'm' | 'b';
}

const SizeMap = {
  s: `
    font-size: 12px;
    padding: 6px;
  `,
  m: `
    font-size: 14px;
    padding: 9px;
  `,
  b: `
    font-size: 16px;
    padding: 12px;
  `,
};

const Button = styled.button<ButtonProps>`
  background: #ffffff;
  border: none;
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  line-height: 1;
  color: ${({ theme }) => theme.normal.main};
  ${({ size = 'm' }) => SizeMap[size]};

  &:hover {
    color: ${({ theme }) => theme.highlight.main};
  }
`;

export default Button;
