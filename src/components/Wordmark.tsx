import React from 'react';
import { AerovizLogo, type AerovizLogoProps } from './AerovizLogo';

export interface WordmarkProps extends AerovizLogoProps {
  light?: boolean;
}

export const Wordmark: React.FC<WordmarkProps> = (props) => {
  return <AerovizLogo {...props} />;
};

export default Wordmark;
