import React from 'react';

import '../../styles/theme-base.scss';

export interface ICard {
  children: any;
  title?: any;
}

export const Card: React.FC<ICard> = (props) => {
  const { children, title } = props;

  return (
    <div className="card">
        {title && <div className="card-header">
          {title}
        </div>}
        <div className="card-body">
          {children}
        </div>
      </div>
  );
}
