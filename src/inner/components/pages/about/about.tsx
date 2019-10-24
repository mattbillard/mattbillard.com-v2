import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card } from 'antd-mobile';

import { getAboutText, IStoreState } from '../../../redux';
import { IAboutText } from '../../../types';

export interface IAboutView {
  aboutText: IAboutText;
  getAboutText: typeof getAboutText;
}

export const AboutView: React.FC<IAboutView> = (props) => {
  const { aboutText, getAboutText } = props;

  useEffect(() => {
    !aboutText && getAboutText();
  });

  return (
    <div>
      {/* <h2>About</h2>
      {aboutText && (
        <React.Fragment>
          <pre>{ JSON.stringify(aboutText, null, '  ') }</pre>
        </React.Fragment>
      )} */}

      <Card>
        <Card.Header title="This is title" />
        <Card.Body>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <p>Lorem ipusum</p>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title="This is title" />
        <Card.Body>
          <p>Lorem ipusum</p>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title="This is title" />
        <Card.Body>
          <p>Lorem ipusum</p>
        </Card.Body>
      </Card>

    </div>
  );
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
