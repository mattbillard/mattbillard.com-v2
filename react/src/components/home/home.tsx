import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getHomeText, IStoreState } from '../../redux';
import { IHomeText } from '../../types';

export interface IHomeView {
  homeText: IHomeText;
  getHomeText: typeof getHomeText;
}

class HomeView extends Component<IHomeView, {}> {
  componentDidMount() {
    const { homeText, getHomeText } = this.props;
    !homeText && getHomeText();
  }

  render() {
    const { homeText } = this.props;

    return (
      <div>
        <h2>Home</h2>
        {homeText && (
          <React.Fragment>
            <pre>{ JSON.stringify(homeText, null, '  ') }</pre>
          </React.Fragment>
        )}
      </div>
    );
  }
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
