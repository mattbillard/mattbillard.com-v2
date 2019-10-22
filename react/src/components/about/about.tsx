import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAboutText, IStoreState } from '../../redux';
import { IAboutText } from '../../types';

export interface IAboutView {
  aboutText: IAboutText;
  getAboutText: typeof getAboutText;
}

class AboutView extends Component<IAboutView, {}> {
  componentDidMount() {
    const { aboutText, getAboutText } = this.props;
    !aboutText && getAboutText();
  }

  render() {
    const { aboutText } = this.props;

    return (
      <div>
        <h2>About</h2>
        {aboutText && (
          <React.Fragment>
            <pre>{ JSON.stringify(aboutText, null, '  ') }</pre>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IStoreState) => ({
  aboutText: state.textReducer.aboutText
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getAboutText
  }, dispatch)
);

export const About = connect(mapStateToProps, mapDispatchToProps)(AboutView);
