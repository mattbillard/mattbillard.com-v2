import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getHomeText, IStoreState } from '../../../redux';
import { IHomeText } from '../../../types';
import { tellParentToUpdateUrl } from '../../../../shared/utils/utils';

import './home.scss';

export interface IHomeView {
  homeText: IHomeText;
  getHomeText: typeof getHomeText;
}

export const HomeView: React.FC<IHomeView> = (props) => {
  const { homeText, getHomeText } = props;

  useEffect(() => {
    !homeText && getHomeText();
    tellParentToUpdateUrl('home');
  });

  if (!homeText) {
    return null;
  }

  return (
    <div className="home">

      <div>
        <div className="logo-big">
          <i className="fab fa-react"></i> 
        </div>
        <div className="logo-small">
          <i className="fab fa-vuejs"></i> 
          <i className="fab fa-js"></i> 
          <i className="fab fa-node-js"></i> 
          <i className="fab fa-java"></i> 
          <i className="fab fa-python"></i> 
        </div>
      </div>

      <div>
        <h1>{homeText.name}</h1>
        <h2>{homeText.title}</h2>
      </div>

    </div>
  );
}

const mapStateToProps = (state: IStoreState) => ({
  homeText: state.textReducer.homeText
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getHomeText
  }, dispatch)
);

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeView);
