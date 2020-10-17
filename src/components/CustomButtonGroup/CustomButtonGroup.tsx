import React from 'react';
import styled from 'styled-components';

const ButtonGroup = styled.span`
  display: flex;
  flex-direction: column;
  margin: ${props => props.theme.spacings.p2};

  > * {
    height: ${props => props.theme.spacings.p12};
    margin: 0;

    &:first-child {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-child {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
`;

const CustomButtonGroup: React.FC = (props) => {
  return (
    <ButtonGroup>
      {props.children}
    </ButtonGroup>
  );
};

export default CustomButtonGroup;