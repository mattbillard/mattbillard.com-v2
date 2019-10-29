import React from 'react';

import '../../styles/theme-base.scss';

export interface IButton {
  onClick: any;
  children: any;
}

export const Button: React.FC<IButton> = (props) => {
  const { children, onClick } = props;

  return (
    // eslint-disable-next-line
    <a className="button" onClick={onClick}>
      {children}
    </a>
  );
}
