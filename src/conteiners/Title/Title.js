import React from 'react';
import TitleWrapper from './TitleWrapper';

const Title = ({ title }) => {
  return (
    <TitleWrapper>
      <h3>{title}</h3>
    </TitleWrapper>
  )
}

export default Title;
