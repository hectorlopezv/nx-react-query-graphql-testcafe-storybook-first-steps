import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface StorybooklibProps {}

const StyledStorybooklib = styled.div`
  color: pink;
`;

export function Storybooklib(props: StorybooklibProps) {
  return (
    <StyledStorybooklib>
      <h1>Welcome to Storybooklib!</h1>
    </StyledStorybooklib>
  );
}

export default Storybooklib;
